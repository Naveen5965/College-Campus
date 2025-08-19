-- Create colleges table for storing comprehensive college information
CREATE TABLE IF NOT EXISTS colleges (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('engineering', 'medical', 'both')),
  location VARCHAR(255) NOT NULL,
  state VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  established_year INTEGER,
  affiliation VARCHAR(255),
  approval VARCHAR(255),
  ranking_nirf INTEGER,
  ranking_other VARCHAR(255),
  website_url VARCHAR(500),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create courses table for college programs
CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
  college_id INTEGER REFERENCES colleges(id) ON DELETE CASCADE,
  course_name VARCHAR(255) NOT NULL,
  course_type VARCHAR(50) NOT NULL CHECK (course_type IN ('undergraduate', 'postgraduate', 'diploma')),
  duration VARCHAR(50),
  seats_total INTEGER,
  seats_available INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create fees table for fee structure
CREATE TABLE IF NOT EXISTS fees (
  id SERIAL PRIMARY KEY,
  college_id INTEGER REFERENCES colleges(id) ON DELETE CASCADE,
  course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
  fee_type VARCHAR(100) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'INR',
  academic_year VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create placements table for placement statistics
CREATE TABLE IF NOT EXISTS placements (
  id SERIAL PRIMARY KEY,
  college_id INTEGER REFERENCES colleges(id) ON DELETE CASCADE,
  academic_year VARCHAR(20) NOT NULL,
  total_students INTEGER,
  students_placed INTEGER,
  placement_percentage DECIMAL(5,2),
  highest_package DECIMAL(12,2),
  average_package DECIMAL(12,2),
  median_package DECIMAL(12,2),
  top_recruiters TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create admissions table for admission criteria
CREATE TABLE IF NOT EXISTS admissions (
  id SERIAL PRIMARY KEY,
  college_id INTEGER REFERENCES colleges(id) ON DELETE CASCADE,
  course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
  entrance_exam VARCHAR(255),
  cutoff_score DECIMAL(6,2),
  eligibility_criteria TEXT,
  application_deadline DATE,
  admission_process TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create facilities table for college facilities
CREATE TABLE IF NOT EXISTS facilities (
  id SERIAL PRIMARY KEY,
  college_id INTEGER REFERENCES colleges(id) ON DELETE CASCADE,
  facility_type VARCHAR(100) NOT NULL,
  facility_name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create reviews table for student reviews
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  college_id INTEGER REFERENCES colleges(id) ON DELETE CASCADE,
  student_name VARCHAR(255),
  course VARCHAR(255),
  graduation_year INTEGER,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_colleges_type ON colleges(type);
CREATE INDEX IF NOT EXISTS idx_colleges_state ON colleges(state);
CREATE INDEX IF NOT EXISTS idx_colleges_ranking ON colleges(ranking_nirf);
CREATE INDEX IF NOT EXISTS idx_courses_college_id ON courses(college_id);
CREATE INDEX IF NOT EXISTS idx_fees_college_id ON fees(college_id);
CREATE INDEX IF NOT EXISTS idx_placements_college_id ON placements(college_id);
CREATE INDEX IF NOT EXISTS idx_admissions_college_id ON admissions(college_id);
CREATE INDEX IF NOT EXISTS idx_facilities_college_id ON facilities(college_id);
CREATE INDEX IF NOT EXISTS idx_reviews_college_id ON reviews(college_id);
