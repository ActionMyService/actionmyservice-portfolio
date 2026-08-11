import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SERVICES } from "@/lib/constants";

const VALID_SERVICES = SERVICES.map((s) => s.value);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const service = typeof body.service === "string" ? body.service : "";
    const projectDetails =
      typeof body.projectDetails === "string" ? body.projectDetails.trim() : "";
    const budget = typeof body.budget === "string" ? body.budget.trim() : "";

    // Validation
    if (!name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "A valid email is required." },
        { status: 400 }
      );
    }
    if (!service || !VALID_SERVICES.includes(service as (typeof SERVICES)[number]["value"])) {
      return NextResponse.json(
        { error: "Please select a valid service." },
        { status: 400 }
      );
    }
    if (!projectDetails) {
      return NextResponse.json(
        { error: "Project details are required." },
        { status: 400 }
      );
    }

    // Rate limiting: max 5 messages per email per hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentCount = await prisma.contactMessage.count({
      where: {
        email,
        createdAt: { gte: oneHourAgo },
      },
    });

    if (recentCount >= 5) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const message = await prisma.contactMessage.create({
      data: {
        name,
        email,
        service,
        projectDetails,
        budget: budget || null,
      },
    });

    return NextResponse.json(
      { success: true, id: message.id },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}