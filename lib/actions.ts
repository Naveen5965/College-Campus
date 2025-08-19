"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

// Authentication actions
export async function signIn(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  const cookieStore = cookies()
  const supabase = createServerActionClient({ cookies: () => cookieStore })

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.toString(),
      password: password.toString(),
    })

    if (error) {
      return { error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error("Login error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export async function signUp(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  const cookieStore = cookies()
  const supabase = createServerActionClient({ cookies: () => cookieStore })

  try {
    const { error } = await supabase.auth.signUp({
      email: email.toString(),
      password: password.toString(),
      options: {
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
          `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/callback`,
      },
    })

    if (error) {
      return { error: error.message }
    }

    return { success: "Check your email to confirm your account." }
  } catch (error) {
    console.error("Sign up error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export async function signOut() {
  const cookieStore = cookies()
  const supabase = createServerActionClient({ cookies: () => cookieStore })

  await supabase.auth.signOut()
  redirect("/auth/login")
}

// Application management actions
export async function createApplication(prevState: any, formData: FormData) {
  const cookieStore = cookies()
  const supabase = createServerActionClient({ cookies: () => cookieStore })

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { error: "You must be logged in to create an application" }
  }

  const collegeId = formData.get("collegeId")
  const courseId = formData.get("courseId")
  const deadline = formData.get("deadline")
  const notes = formData.get("notes")

  try {
    const { error } = await supabase.from("user_applications").insert({
      user_id: user.id,
      college_id: Number.parseInt(collegeId as string),
      course_id: courseId ? Number.parseInt(courseId as string) : null,
      deadline: deadline || null,
      notes: notes || null,
      status: "draft",
    })

    if (error) {
      return { error: error.message }
    }

    revalidatePath("/admission-tools")
    return { success: "Application created successfully!" }
  } catch (error) {
    console.error("Create application error:", error)
    return { error: "Failed to create application" }
  }
}

export async function updateApplicationStatus(applicationId: number, status: string) {
  const cookieStore = cookies()
  const supabase = createServerActionClient({ cookies: () => cookieStore })

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("You must be logged in")
  }

  const { error } = await supabase
    .from("user_applications")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", applicationId)
    .eq("user_id", user.id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/admission-tools")
}

// Profile management
export async function updateProfile(prevState: any, formData: FormData) {
  const cookieStore = cookies()
  const supabase = createServerActionClient({ cookies: () => cookieStore })

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { error: "You must be logged in" }
  }

  const profileData = {
    user_id: user.id,
    full_name: formData.get("fullName"),
    phone: formData.get("phone"),
    date_of_birth: formData.get("dateOfBirth"),
    gender: formData.get("gender"),
    category: formData.get("category"),
    state: formData.get("state"),
    city: formData.get("city"),
    tenth_percentage: formData.get("tenthPercentage")
      ? Number.parseFloat(formData.get("tenthPercentage") as string)
      : null,
    twelfth_percentage: formData.get("twelfthPercentage")
      ? Number.parseFloat(formData.get("twelfthPercentage") as string)
      : null,
    updated_at: new Date().toISOString(),
  }

  try {
    const { error } = await supabase.from("user_profiles").upsert(profileData)

    if (error) {
      return { error: error.message }
    }

    revalidatePath("/profile")
    return { success: "Profile updated successfully!" }
  } catch (error) {
    console.error("Update profile error:", error)
    return { error: "Failed to update profile" }
  }
}
