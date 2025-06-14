import { DailyCountryService } from "@/lib/services/country/DailyCountryService";
import { ResponseService } from "@/lib/services/response/responseService";
import { NextRequest, NextResponse } from "next/server";

const API_SECRET_KEY = process.env.CRON_API_SECRET;

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || authHeader !== `Bearer ${API_SECRET_KEY}`) {
    return NextResponse.json(
      { success: false, message: "Unauthorized access" },
      { status: 401 }
    );
  }

  try {
    const dailyCountryService = new DailyCountryService();
    const result = await dailyCountryService.updateDailyCountry();

    if (result.success) {
      return ResponseService.success(
        "Daily country updated successfully",
        result.data
      );
    } else {
      return ResponseService.error(
        result.message || "Failed to update daily country"
      );
    }
  } catch (error) {
    console.error("Error updating daily country", error);
    return ResponseService.error("Internal server error");
  }
}
