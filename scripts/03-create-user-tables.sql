-- Create user applications table
CREATE TABLE IF NOT EXISTS user_applications (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    college_id INTEGER REFERENCES colleges(id) ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'draft',
    application_date DATE DEFAULT CURRENT_DATE,
    deadline DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user documents table
CREATE TABLE IF NOT EXISTS user_documents (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    document_name VARCHAR(255) NOT NULL,
    document_type VARCHAR(100) NOT NULL,
    file_url TEXT,
    file_size INTEGER,
    upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_verified BOOLEAN DEFAULT FALSE
);

-- Create user profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(255),
    phone VARCHAR(20),
    date_of_birth DATE,
    gender VARCHAR(20),
    category VARCHAR(50),
    state VARCHAR(100),
    city VARCHAR(100),
    tenth_percentage DECIMAL(5,2),
    twelfth_percentage DECIMAL(5,2),
    entrance_scores JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create scholarships table
CREATE TABLE IF NOT EXISTS scholarships (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    amount DECIMAL(10,2),
    eligibility_criteria TEXT,
    application_deadline DATE,
    provider VARCHAR(255),
    category VARCHAR(100),
    type VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample scholarships
INSERT INTO scholarships (name, description, amount, eligibility_criteria, application_deadline, provider, category, type) VALUES
('Merit Scholarship', 'For students with excellent academic performance', 50000, 'Minimum 85% in 12th grade', '2024-06-30', 'Government', 'Merit', 'Full'),
('SC/ST Scholarship', 'For students from SC/ST category', 75000, 'SC/ST category certificate required', '2024-07-15', 'Government', 'Category', 'Full'),
('Need-based Scholarship', 'For economically disadvantaged students', 40000, 'Family income below 2 LPA', '2024-08-01', 'Private', 'Need-based', 'Partial'),
('Sports Scholarship', 'For students with sports achievements', 60000, 'State/National level sports participation', '2024-05-30', 'University', 'Sports', 'Full');

-- Enable Row Level Security
ALTER TABLE user_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for user_applications
CREATE POLICY "Users can view own applications" ON user_applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own applications" ON user_applications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own applications" ON user_applications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own applications" ON user_applications FOR DELETE USING (auth.uid() = user_id);

-- Create policies for user_documents
CREATE POLICY "Users can view own documents" ON user_documents FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own documents" ON user_documents FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own documents" ON user_documents FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own documents" ON user_documents FOR DELETE USING (auth.uid() = user_id);

-- Create policies for user_profiles
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = user_id);

-- Create policies for scholarships (public read)
ALTER TABLE scholarships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view scholarships" ON scholarships FOR SELECT USING (true);
