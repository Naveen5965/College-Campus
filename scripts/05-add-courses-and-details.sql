-- Adding comprehensive course data, fees, placements, facilities, and reviews

-- Insert Courses for Engineering Colleges
INSERT INTO courses (college_id, course_name, course_type, duration, seats_total, seats_available) VALUES
-- IIT Delhi Courses
(1, 'Computer Science and Engineering', 'B.Tech', '4 years', 120, 15),
(1, 'Electrical Engineering', 'B.Tech', '4 years', 100, 8),
(1, 'Mechanical Engineering', 'B.Tech', '4 years', 110, 12),
(1, 'Civil Engineering', 'B.Tech', '4 years', 90, 20),
(1, 'Chemical Engineering', 'B.Tech', '4 years', 80, 10),
(1, 'Computer Science and Engineering', 'M.Tech', '2 years', 60, 5),
(1, 'Artificial Intelligence', 'M.Tech', '2 years', 40, 3),

-- IIT Bombay Courses
(2, 'Computer Science and Engineering', 'B.Tech', '4 years', 115, 10),
(2, 'Electrical Engineering', 'B.Tech', '4 years', 105, 12),
(2, 'Mechanical Engineering', 'B.Tech', '4 years', 115, 18),
(2, 'Aerospace Engineering', 'B.Tech', '4 years', 70, 8),
(2, 'Chemical Engineering', 'B.Tech', '4 years', 85, 15),
(2, 'Data Science', 'M.Tech', '2 years', 50, 4),

-- IIT Madras Courses
(3, 'Computer Science and Engineering', 'B.Tech', '4 years', 110, 8),
(3, 'Electrical Engineering', 'B.Tech', '4 years', 95, 10),
(3, 'Mechanical Engineering', 'B.Tech', '4 years', 105, 14),
(3, 'Ocean Engineering', 'B.Tech', '4 years', 40, 12),
(3, 'Biotechnology', 'B.Tech', '4 years', 50, 8),

-- Medical College Courses
(19, 'Bachelor of Medicine and Bachelor of Surgery', 'MBBS', '5.5 years', 100, 5),
(19, 'Doctor of Medicine', 'MD', '3 years', 50, 2),
(19, 'Master of Surgery', 'MS', '3 years', 30, 1),
(19, 'Bachelor of Dental Surgery', 'BDS', '5 years', 80, 8),

(20, 'Bachelor of Medicine and Bachelor of Surgery', 'MBBS', '5.5 years', 150, 8),
(20, 'Doctor of Medicine', 'MD', '3 years', 75, 3),
(20, 'Master of Surgery', 'MS', '3 years', 45, 2),

-- International Courses
(27, 'Computer Science', 'Bachelor', '4 years', 500, 25),
(27, 'Electrical Engineering', 'Bachelor', '4 years', 400, 30),
(27, 'Mechanical Engineering', 'Bachelor', '4 years', 450, 35),
(27, 'Artificial Intelligence', 'Master', '2 years', 200, 15),

(28, 'Computer Science', 'Bachelor', '4 years', 600, 40),
(28, 'Electrical Engineering', 'Bachelor', '4 years', 500, 45),
(28, 'Bioengineering', 'Bachelor', '4 years', 300, 20);

-- Insert Fees
INSERT INTO fees (college_id, course_id, fee_type, amount, currency, academic_year) VALUES
-- IIT Delhi Fees
(1, 1, 'Tuition Fee', 200000, 'INR', '2024-25'),
(1, 1, 'Hostel Fee', 50000, 'INR', '2024-25'),
(1, 1, 'Mess Fee', 40000, 'INR', '2024-25'),
(1, 6, 'Tuition Fee', 150000, 'INR', '2024-25'),

-- IIT Bombay Fees
(2, 8, 'Tuition Fee', 200000, 'INR', '2024-25'),
(2, 8, 'Hostel Fee', 55000, 'INR', '2024-25'),
(2, 8, 'Mess Fee', 42000, 'INR', '2024-25'),

-- Medical College Fees
(19, 14, 'Tuition Fee', 1500, 'INR', '2024-25'),
(19, 14, 'Hostel Fee', 15000, 'INR', '2024-25'),
(19, 14, 'Mess Fee', 25000, 'INR', '2024-25'),

-- International Fees
(27, 20, 'Tuition Fee', 55000, 'USD', '2024-25'),
(27, 20, 'Living Expenses', 20000, 'USD', '2024-25'),
(28, 24, 'Tuition Fee', 58000, 'USD', '2024-25'),
(28, 24, 'Living Expenses', 22000, 'USD', '2024-25');

-- Insert Placements
INSERT INTO placements (college_id, academic_year, placement_percentage, average_package, median_package, highest_package, students_placed, total_students, top_recruiters) VALUES
(1, '2023-24', 95.5, 2500000, 2200000, 18000000, 1145, 1200, ARRAY['Google', 'Microsoft', 'Amazon', 'Goldman Sachs', 'McKinsey']),
(2, '2023-24', 94.8, 2400000, 2100000, 17500000, 1138, 1200, ARRAY['Google', 'Microsoft', 'Facebook', 'Apple', 'Tesla']),
(3, '2023-24', 96.2, 2600000, 2300000, 19000000, 1155, 1201, ARRAY['Google', 'Microsoft', 'Amazon', 'Uber', 'Netflix']),
(4, '2023-24', 93.5, 2300000, 2000000, 16500000, 1122, 1200, ARRAY['Microsoft', 'Amazon', 'Google', 'Intel', 'Qualcomm']),
(5, '2023-24', 94.2, 2350000, 2050000, 17000000, 1130, 1200, ARRAY['Google', 'Microsoft', 'Amazon', 'IBM', 'Accenture']),
(9, '2023-24', 92.8, 1800000, 1600000, 12000000, 835, 900, ARRAY['TCS', 'Infosys', 'Wipro', 'Microsoft', 'Amazon']),
(10, '2023-24', 91.5, 1750000, 1550000, 11500000, 823, 900, ARRAY['TCS', 'Infosys', 'Google', 'Microsoft', 'Samsung']),
(13, '2023-24', 89.5, 1200000, 1000000, 8500000, 1790, 2000, ARRAY['TCS', 'Infosys', 'Wipro', 'Cognizant', 'Accenture']),
(17, '2023-24', 88.2, 1150000, 950000, 7500000, 1764, 2000, ARRAY['TCS', 'Infosys', 'Wipro', 'HCL', 'Tech Mahindra']),
(27, '2023-24', 98.5, 12000000, 11000000, 25000000, 492, 500, ARRAY['Google', 'Apple', 'Microsoft', 'Tesla', 'SpaceX']),
(28, '2023-24', 97.8, 11500000, 10500000, 24000000, 587, 600, ARRAY['Google', 'Facebook', 'Apple', 'Netflix', 'Uber']);

-- Insert Facilities
INSERT INTO facilities (college_id, facility_type, facility_name, description) VALUES
-- IIT Delhi Facilities
(1, 'Academic', 'Central Library', 'State-of-the-art library with over 500,000 books and digital resources'),
(1, 'Research', 'Advanced Computing Lab', 'High-performance computing facility with latest hardware'),
(1, 'Sports', 'Olympic Swimming Pool', '50-meter Olympic standard swimming pool'),
(1, 'Accommodation', 'Student Hostels', '16 hostels accommodating over 8,000 students'),
(1, 'Medical', 'Health Center', '24/7 medical facility with qualified doctors'),
(1, 'Recreation', 'Student Activity Center', 'Multi-purpose hall for cultural and recreational activities'),

-- IIT Bombay Facilities
(2, 'Academic', 'Central Library', 'Modern library with extensive collection and study spaces'),
(2, 'Research', 'Sophisticated Analytical Instrument Facility', 'Advanced research equipment for various disciplines'),
(2, 'Sports', 'Sports Complex', 'Comprehensive sports facilities including gym, courts, and fields'),
(2, 'Accommodation', 'Student Housing', 'Multiple hostels with modern amenities'),
(2, 'Medical', 'Institute Hospital', 'Well-equipped medical facility'),

-- Medical College Facilities
(19, 'Medical', 'AIIMS Hospital', '2,500+ bed super specialty hospital'),
(19, 'Academic', 'Medical Library', 'Comprehensive medical literature and research resources'),
(19, 'Research', 'Research Labs', 'Advanced medical research laboratories'),
(19, 'Medical', 'Trauma Center', 'Level 1 trauma center with emergency services'),
(19, 'Academic', 'Simulation Lab', 'Medical simulation training facility'),

-- International Facilities
(27, 'Academic', 'MIT Libraries', 'World-class library system with extensive resources'),
(27, 'Research', 'Research Labs', 'Cutting-edge research facilities across all departments'),
(27, 'Sports', 'Athletic Facilities', 'Comprehensive sports and fitness facilities'),
(27, 'Accommodation', 'Student Residences', 'On-campus housing for undergraduate and graduate students'),
(27, 'Innovation', 'Innovation Labs', 'Maker spaces and innovation laboratories');

-- Insert Admissions
INSERT INTO admissions (college_id, course_id, entrance_exam, cutoff_score, eligibility_criteria, application_deadline, admission_process) VALUES
-- IIT Admissions
(1, 1, 'JEE Advanced', 95.5, '75% in Class 12, JEE Main qualification', '2024-06-15', 'JEE Main → JEE Advanced → Counselling'),
(1, 2, 'JEE Advanced', 94.2, '75% in Class 12, JEE Main qualification', '2024-06-15', 'JEE Main → JEE Advanced → Counselling'),
(1, 6, 'GATE', 85.0, 'B.Tech degree with 60% marks', '2024-03-15', 'GATE Score → Application → Interview'),

(2, 8, 'JEE Advanced', 96.2, '75% in Class 12, JEE Main qualification', '2024-06-15', 'JEE Main → JEE Advanced → Counselling'),
(2, 9, 'JEE Advanced', 95.8, '75% in Class 12, JEE Main qualification', '2024-06-15', 'JEE Main → JEE Advanced → Counselling'),

-- Medical Admissions
(19, 14, 'NEET UG', 99.8, '50% in Class 12 with PCB', '2024-05-15', 'NEET UG → Counselling → Document Verification'),
(19, 15, 'NEET PG', 95.0, 'MBBS degree with internship', '2024-04-20', 'NEET PG → Merit List → Counselling'),

(20, 18, 'NEET UG', 99.5, '50% in Class 12 with PCB', '2024-05-15', 'NEET UG → Counselling → Document Verification'),

-- International Admissions
(27, 20, 'SAT', 1550, 'High School Diploma, Strong Academic Record', '2024-01-01', 'Application → SAT/ACT → Essays → Interview'),
(27, 23, 'GRE', 325, 'Bachelor degree in relevant field', '2024-12-15', 'Application → GRE → SOP → LOR → Interview'),

(28, 24, 'SAT', 1520, 'High School Diploma, Strong Academic Record', '2024-01-01', 'Application → SAT/ACT → Essays → Interview');

-- Insert Reviews
INSERT INTO reviews (college_id, student_name, course, graduation_year, rating, review_text, verified) VALUES
(1, 'Rahul Sharma', 'Computer Science', 2023, 5, 'Excellent faculty, great research opportunities, and amazing campus life. The placement support is outstanding.', true),
(1, 'Priya Patel', 'Electrical Engineering', 2022, 5, 'World-class infrastructure and brilliant peer group. The academic rigor is challenging but rewarding.', true),
(1, 'Amit Kumar', 'Mechanical Engineering', 2023, 4, 'Great college with excellent facilities. The only downside is the intense competition among students.', true),

(2, 'Sneha Reddy', 'Computer Science', 2023, 5, 'Amazing research culture and industry connections. The campus is beautiful and well-maintained.', true),
(2, 'Vikram Singh', 'Chemical Engineering', 2022, 5, 'Top-notch faculty and excellent lab facilities. Great exposure to industry through internships.', true),

(3, 'Ananya Iyer', 'Computer Science', 2023, 5, 'Best technical education in India. The alumni network is incredibly strong and helpful.', true),
(3, 'Karthik Nair', 'Ocean Engineering', 2022, 4, 'Unique programs and excellent research opportunities. The campus culture is very collaborative.', true),

(19, 'Dr. Aisha Khan', 'MBBS', 2021, 5, 'Best medical education in the country. Excellent clinical exposure and research opportunities.', true),
(19, 'Dr. Rohit Gupta', 'MD Internal Medicine', 2020, 5, 'World-class medical training with exposure to complex cases. Great learning environment.', true),

(20, 'Dr. Meera Joshi', 'MBBS', 2022, 4, 'Good clinical training and research facilities. The patient load provides excellent learning opportunities.', true),

(27, 'John Smith', 'Computer Science', 2023, 5, 'Incredible innovation culture and access to cutting-edge research. The entrepreneurship ecosystem is unmatched.', true),
(27, 'Sarah Johnson', 'Electrical Engineering', 2022, 5, 'World-class faculty and research facilities. The problem-solving approach is exceptional.', true),

(28, 'Michael Chen', 'Computer Science', 2023, 5, 'Amazing campus in Silicon Valley with direct industry connections. Great startup culture.', true),
(28, 'Emily Davis', 'Bioengineering', 2022, 4, 'Excellent interdisciplinary programs and research opportunities. Very collaborative environment.', true);
