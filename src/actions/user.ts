"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { generateAIInsights } from "./dashboard";
import { onboardingSchema } from "@/app/lib/schema";
import z from "zod";

export async function updateUser(data: z.infer<typeof onboardingSchema>) {
  const { userId , redirectToSignIn } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    return redirectToSignIn();
  }
  
  try {
    // Start a transaction to handle both operations
    const result = await db.$transaction(
      async (tx) => {
        // First check if industry exists
        let industryInsight = await tx.industryInsight.findUnique({
          where: {
            industry: data.industry,
          },
        });

        // If industry doesn't exist, create it with default values
        if (!industryInsight) {
          const insights = await generateAIInsights(data.industry);

          industryInsight = await db.industryInsight.create({
            data: {
              industry: data.industry,
              ...insights,
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
          });
        }

        // if (!industryInsight) {
        //   industryInsight = await tx. industryInsight.create({
        //   data: {
        //   industry: data.industry,
        //   salaryRanges: [], // Default empty array
        //   growthRate: 0, // Default value
        //   demandLevel: "Medium", // Default value
        //   topSkills: [], // Default empty array
        //   marketOutlook: "Neutral", // Default value
        //   keyTrends: [], // Default empty array
        //   recommendedSkills: [], // Default empty array
        //   nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        //   }
        //   });
        // }


        
        // Now update the user
        const updatedUser = await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            industry: data.industry,
            experience: data.experience,
            bio: data.bio,
            skills: data.skills,
          },
        });

        return { updatedUser, industryInsight };
      },
      {
        timeout: 10000, // default: 5000
      }
    );

    revalidatePath("/");
    return { success: true, user: result.updatedUser };
  } catch (error) {
    console.error("Error updating user and industry:", (error as Error).message);
    throw new Error("Failed to update profile");
  }
}

export async function getUserOnboardingStatus() {
  const { userId , redirectToSignIn } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
  return redirectToSignIn();
}

  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select: {
        industry: true,
      },
    });

    return {
      isOnboarded: !!user?.industry,
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    throw new Error("Failed to check onboarding status");
  }
}
