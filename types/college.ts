export interface College {
  id: number
  name: string
  type: string
  location: string
  city: string
  state: string
  established_year: number
  ranking_nirf?: number
  ranking_other?: string
  contact_phone?: string
  contact_email?: string
  website_url?: string
  approval?: string
  affiliation?: string
  created_at: string
  updated_at: string
}

export interface Course {
  id: number
  college_id: number
  course_name: string
  course_type: string
  duration: string
  seats_total: number
  seats_available: number
  created_at: string
}

export interface Placement {
  id: number
  college_id: number
  academic_year: string
  placement_percentage: number
  average_package: number
  highest_package: number
  median_package: number
  students_placed: number
  total_students: number
  top_recruiters: string[]
  created_at: string
}

export interface Fee {
  id: number
  college_id: number
  course_id: number
  fee_type: string
  amount: number
  currency: string
  academic_year: string
  created_at: string
}

export interface Facility {
  id: number
  college_id: number
  facility_type: string
  facility_name: string
  description: string
  created_at: string
}

export interface Admission {
  id: number
  college_id: number
  course_id: number
  entrance_exam: string
  cutoff_score: number
  eligibility_criteria: string
  application_deadline: string
  admission_process: string
  created_at: string
}

export interface Review {
  id: number
  college_id: number
  student_name: string
  course: string
  graduation_year: number
  rating: number
  review_text: string
  verified: boolean
  created_at: string
}
