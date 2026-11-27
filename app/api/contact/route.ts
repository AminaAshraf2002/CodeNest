import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, whatsappNumber, projectType, budget, message, hp } = body;

    // Honeypot spam check
    if (hp) {
      return NextResponse.json({ success: true, message: "Enquiry submitted successfully." });
    }

    // Validation checks
    const errors: Record<string, string> = {};

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      errors.name = "Please enter your full name (at least 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (!whatsappNumber || typeof whatsappNumber !== "string" || whatsappNumber.trim().length < 6) {
      errors.whatsappNumber = "Please enter a valid phone or WhatsApp number.";
    }

    if (!projectType || typeof projectType !== "string") {
      errors.projectType = "Please select a project type.";
    }

    if (!budget || typeof budget !== "string") {
      errors.budget = "Please select a budget range.";
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      errors.message = "Please share a brief description of your project (at least 10 characters).";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          errors,
          message: "Please complete all required fields correctly.",
        },
        { status: 400 }
      );
    }

    // Structured logging - ready for email dispatch (Resend, SendGrid, SMTP)
    const enquiry = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      whatsappNumber: whatsappNumber.trim(),
      projectType: projectType.trim(),
      budget: budget.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
      userAgent: req.headers.get("user-agent") || "unknown",
      ip: req.headers.get("x-forwarded-for") || "unknown",
    };

    console.log("[CodeNest Contact Enquiry Received]:", JSON.stringify(enquiry, null, 2));

    return NextResponse.json({
      success: true,
      message:
        "Thank you for contacting CodeNest. I have received your enquiry and will review your requirements within 24 hours.",
    });
  } catch (error) {
    console.error("[CodeNest Contact Route Error]:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred while processing your request. Please try again or reach out directly via WhatsApp.",
      },
      { status: 500 }
    );
  }
}
