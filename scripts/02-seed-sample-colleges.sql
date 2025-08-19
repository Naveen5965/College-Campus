-- Insert sample engineering and medical colleges
INSERT INTO colleges (name, type, location, state, city, established_year, affiliation, approval, ranking_nirf, website_url, contact_email, contact_phone) VALUES
('Indian Institute of Technology Delhi', 'engineering', 'Hauz Khas, New Delhi', 'Delhi', 'New Delhi', 1961, 'Autonomous', 'AICTE, UGC', 2, 'https://www.iitd.ac.in', 'info@iitd.ac.in', '+91-11-2659-1000'),
('All India Institute of Medical Sciences Delhi', 'medical', 'Ansari Nagar, New Delhi', 'Delhi', 'New Delhi', 1956, 'Autonomous', 'MCI, NMC', 1, 'https://www.aiims.edu', 'info@aiims.ac.in', '+91-11-2659-3333'),
('Indian Institute of Technology Bombay', 'engineering', 'Powai, Mumbai', 'Maharashtra', 'Mumbai', 1958, 'Autonomous', 'AICTE, UGC', 3, 'https://www.iitb.ac.in', 'info@iitb.ac.in', '+91-22-2572-2545'),
('Christian Medical College Vellore', 'medical', 'Ida Scudder Road, Vellore', 'Tamil Nadu', 'Vellore', 1900, 'Private', 'MCI, NMC', 2, 'https://www.cmch-vellore.edu', 'info@cmcvellore.ac.in', '+91-416-228-1000'),
('Indian Institute of Technology Madras', 'engineering', 'Sardar Patel Road, Chennai', 'Tamil Nadu', 'Chennai', 1959, 'Autonomous', 'AICTE, UGC', 1, 'https://www.iitm.ac.in', 'info@iitm.ac.in', '+91-44-2257-4802'),
('Manipal Academy of Higher Education', 'both', 'Manipal', 'Karnataka', 'Manipal', 1953, 'Private', 'UGC, AICTE, MCI', 17, 'https://www.manipal.edu', 'info@manipal.edu', '+91-820-292-3000');

-- Insert sample courses
INSERT INTO courses (college_id, course_name, course_type, duration, seats_total, seats_available) VALUES
(1, 'B.Tech Computer Science', 'undergraduate', '4 years', 120, 15),
(1, 'B.Tech Mechanical Engineering', 'undergraduate', '4 years', 100, 8),
(1, 'M.Tech Computer Science', 'postgraduate', '2 years', 60, 25),
(2, 'MBBS', 'undergraduate', '5.5 years', 125, 0),
(2, 'MD Internal Medicine', 'postgraduate', '3 years', 15, 2),
(3, 'B.Tech Electrical Engineering', 'undergraduate', '4 years', 110, 12),
(4, 'MBBS', 'undergraduate', '5.5 years', 150, 5),
(5, 'B.Tech Aerospace Engineering', 'undergraduate', '4 years', 90, 18),
(6, 'B.Tech Information Technology', 'undergraduate', '4 years', 180, 45),
(6, 'MBBS', 'undergraduate', '5.5 years', 200, 25);

-- Insert sample fees data
INSERT INTO fees (college_id, course_id, fee_type, amount, academic_year) VALUES
(1, 1, 'Tuition Fee', 250000.00, '2024-25'),
(1, 1, 'Hostel Fee', 45000.00, '2024-25'),
(2, 4, 'Tuition Fee', 1500.00, '2024-25'),
(2, 4, 'Hostel Fee', 12000.00, '2024-25'),
(3, 6, 'Tuition Fee', 280000.00, '2024-25'),
(4, 7, 'Tuition Fee', 1800000.00, '2024-25'),
(5, 8, 'Tuition Fee', 275000.00, '2024-25'),
(6, 9, 'Tuition Fee', 450000.00, '2024-25'),
(6, 10, 'Tuition Fee', 1950000.00, '2024-25');

-- Insert sample placement data
INSERT INTO placements (college_id, academic_year, total_students, students_placed, placement_percentage, highest_package, average_package, median_package, top_recruiters) VALUES
(1, '2023-24', 1200, 1150, 95.83, 5500000.00, 1850000.00, 1650000.00, ARRAY['Google', 'Microsoft', 'Amazon', 'Goldman Sachs', 'McKinsey']),
(3, '2023-24', 1100, 1045, 95.00, 4800000.00, 1750000.00, 1550000.00, ARRAY['Google', 'Facebook', 'Apple', 'JP Morgan', 'Uber']),
(5, '2023-24', 950, 912, 96.00, 6200000.00, 1950000.00, 1750000.00, ARRAY['Google', 'Microsoft', 'Tesla', 'SpaceX', 'ISRO']),
(6, '2023-24', 800, 720, 90.00, 2500000.00, 850000.00, 750000.00, ARRAY['TCS', 'Infosys', 'Wipro', 'Accenture', 'IBM']);

-- Insert sample admission criteria
INSERT INTO admissions (college_id, course_id, entrance_exam, cutoff_score, eligibility_criteria, application_deadline, admission_process) VALUES
(1, 1, 'JEE Advanced', 180.00, '75% in 12th PCM, JEE Main qualified', '2024-06-15', 'JEE Advanced → Counselling → Seat Allocation'),
(2, 4, 'NEET UG', 720.00, '50% in 12th PCB, NEET qualified', '2024-07-31', 'NEET UG → Counselling → Document Verification'),
(3, 6, 'JEE Advanced', 175.00, '75% in 12th PCM, JEE Main qualified', '2024-06-15', 'JEE Advanced → Counselling → Seat Allocation'),
(4, 7, 'NEET UG', 680.00, '50% in 12th PCB, NEET qualified', '2024-07-31', 'NEET UG → Counselling → Interview'),
(5, 8, 'JEE Advanced', 185.00, '75% in 12th PCM, JEE Main qualified', '2024-06-15', 'JEE Advanced → Counselling → Seat Allocation');

-- Insert sample facilities
INSERT INTO facilities (college_id, facility_type, facility_name, description) VALUES
(1, 'Academic', 'Central Library', '24/7 library with 500,000+ books and digital resources'),
(1, 'Residential', 'Student Hostels', '16 hostels accommodating 8000+ students'),
(1, 'Sports', 'Sports Complex', 'Olympic-size swimming pool, gymnasium, multiple courts'),
(2, 'Medical', 'Teaching Hospital', '2500-bed multi-specialty hospital'),
(2, 'Academic', 'Medical Library', 'Specialized medical library with latest journals'),
(3, 'Research', 'Innovation Labs', 'State-of-the-art research laboratories'),
(4, 'Medical', 'Multi-specialty Hospital', '2032-bed hospital with advanced medical equipment'),
(5, 'Academic', 'Aerospace Lab', 'Advanced aerospace engineering laboratory'),
(6, 'Campus', 'Digital Campus', 'Fully Wi-Fi enabled campus with smart classrooms');

-- Insert sample reviews
INSERT INTO reviews (college_id, student_name, course, graduation_year, rating, review_text, verified) VALUES
(1, 'Rahul Sharma', 'B.Tech CSE', 2023, 5, 'Excellent faculty, great placement opportunities, and amazing campus life. The research opportunities are world-class.', true),
(2, 'Priya Patel', 'MBBS', 2022, 5, 'Best medical education in India. The clinical exposure and faculty guidance is exceptional.', true),
(3, 'Amit Kumar', 'B.Tech EE', 2023, 4, 'Great technical education and industry connections. Campus facilities are top-notch.', true),
(4, 'Sneha Reddy', 'MBBS', 2021, 5, 'Excellent medical training with strong emphasis on patient care and ethics.', true),
(5, 'Vikram Singh', 'B.Tech Aerospace', 2023, 5, 'Outstanding aerospace program with cutting-edge research opportunities.', true),
(6, 'Anita Joshi', 'B.Tech IT', 2022, 4, 'Good technical education with decent placement opportunities. Campus life is vibrant.', true);
