-- Adding comprehensive Indian engineering and medical colleges data

-- Clear existing data first
DELETE FROM reviews;
DELETE FROM placements;
DELETE FROM fees;
DELETE FROM facilities;
DELETE FROM admissions;
DELETE FROM courses;
DELETE FROM colleges;

-- Reset sequences
ALTER SEQUENCE colleges_id_seq RESTART WITH 1;
ALTER SEQUENCE courses_id_seq RESTART WITH 1;
ALTER SEQUENCE admissions_id_seq RESTART WITH 1;
ALTER SEQUENCE fees_id_seq RESTART WITH 1;
ALTER SEQUENCE placements_id_seq RESTART WITH 1;
ALTER SEQUENCE facilities_id_seq RESTART WITH 1;
ALTER SEQUENCE reviews_id_seq RESTART WITH 1;

-- Insert Indian Engineering Colleges
INSERT INTO colleges (name, location, city, state, type, established_year, ranking_nirf, ranking_other, approval, affiliation, contact_email, contact_phone, website_url) VALUES
-- IITs
('Indian Institute of Technology Delhi', 'Hauz Khas, New Delhi', 'New Delhi', 'Delhi', 'Engineering', 1961, 2, 'QS World Ranking: 197', 'AICTE, UGC', 'Autonomous', 'info@iitd.ac.in', '+91-11-2659-1000', 'https://home.iitd.ac.in'),
('Indian Institute of Technology Bombay', 'Powai, Mumbai', 'Mumbai', 'Maharashtra', 'Engineering', 1958, 3, 'QS World Ranking: 172', 'AICTE, UGC', 'Autonomous', 'info@iitb.ac.in', '+91-22-2572-2545', 'https://www.iitb.ac.in'),
('Indian Institute of Technology Madras', 'Sardar Patel Road, Chennai', 'Chennai', 'Tamil Nadu', 'Engineering', 1959, 1, 'QS World Ranking: 285', 'AICTE, UGC', 'Autonomous', 'info@iitm.ac.in', '+91-44-2257-4802', 'https://www.iitm.ac.in'),
('Indian Institute of Technology Kanpur', 'Kalyanpur, Kanpur', 'Kanpur', 'Uttar Pradesh', 'Engineering', 1959, 4, 'QS World Ranking: 278', 'AICTE, UGC', 'Autonomous', 'info@iitk.ac.in', '+91-512-259-7000', 'https://www.iitk.ac.in'),
('Indian Institute of Technology Kharagpur', 'Kharagpur', 'Kharagpur', 'West Bengal', 'Engineering', 1951, 5, 'QS World Ranking: 271', 'AICTE, UGC', 'Autonomous', 'info@iitkgp.ac.in', '+91-3222-255-221', 'https://www.iitkgp.ac.in'),
('Indian Institute of Technology Roorkee', 'Roorkee', 'Roorkee', 'Uttarakhand', 'Engineering', 1847, 6, 'NIRF Ranking: 6', 'AICTE, UGC', 'Autonomous', 'info@iitr.ac.in', '+91-1332-285-311', 'https://www.iitr.ac.in'),
('Indian Institute of Technology Guwahati', 'Guwahati', 'Guwahati', 'Assam', 'Engineering', 1994, 7, 'NIRF Ranking: 7', 'AICTE, UGC', 'Autonomous', 'info@iitg.ac.in', '+91-361-258-2000', 'https://www.iitg.ac.in'),
('Indian Institute of Technology Hyderabad', 'Kandi, Sangareddy', 'Hyderabad', 'Telangana', 'Engineering', 2008, 8, 'NIRF Ranking: 8', 'AICTE, UGC', 'Autonomous', 'info@iith.ac.in', '+91-40-2301-6000', 'https://www.iith.ac.in'),

-- NITs
('National Institute of Technology Tiruchirappalli', 'Tiruchirappalli', 'Tiruchirappalli', 'Tamil Nadu', 'Engineering', 1964, 9, 'NIRF Ranking: 9', 'AICTE, UGC', 'Autonomous', 'info@nitt.edu', '+91-431-250-3000', 'https://www.nitt.edu'),
('National Institute of Technology Karnataka', 'Surathkal, Mangalore', 'Mangalore', 'Karnataka', 'Engineering', 1960, 10, 'NIRF Ranking: 10', 'AICTE, UGC', 'Autonomous', 'info@nitk.edu.in', '+91-824-247-3000', 'https://www.nitk.ac.in'),
('National Institute of Technology Warangal', 'Warangal', 'Warangal', 'Telangana', 'Engineering', 1959, 19, 'NIRF Ranking: 19', 'AICTE, UGC', 'Autonomous', 'info@nitw.ac.in', '+91-870-246-2000', 'https://www.nitw.ac.in'),
('National Institute of Technology Rourkela', 'Rourkela', 'Rourkela', 'Odisha', 'Engineering', 1961, 16, 'NIRF Ranking: 16', 'AICTE, UGC', 'Autonomous', 'info@nitrkl.ac.in', '+91-661-246-2000', 'https://www.nitrkl.ac.in'),

-- Other Top Engineering Colleges
('Birla Institute of Technology and Science Pilani', 'Pilani', 'Pilani', 'Rajasthan', 'Engineering', 1964, 25, 'NIRF Ranking: 25', 'AICTE, UGC', 'Deemed University', 'info@pilani.bits-pilani.ac.in', '+91-1596-242-204', 'https://www.bits-pilani.ac.in'),
('Delhi Technological University', 'Shahbad Daulatpur, Delhi', 'New Delhi', 'Delhi', 'Engineering', 1941, 36, 'NIRF Ranking: 36', 'AICTE, UGC', 'State University', 'info@dtu.ac.in', '+91-11-2787-2200', 'https://www.dtu.ac.in'),
('Jadavpur University', 'Kolkata', 'Kolkata', 'West Bengal', 'Engineering', 1955, 12, 'NIRF Ranking: 12', 'AICTE, UGC', 'State University', 'info@jaduniv.edu.in', '+91-33-2414-6666', 'https://www.jaduniv.edu.in'),
('Anna University', 'Chennai', 'Chennai', 'Tamil Nadu', 'Engineering', 1978, 13, 'NIRF Ranking: 13', 'AICTE, UGC', 'State University', 'info@annauniv.edu', '+91-44-2235-7000', 'https://www.annauniv.edu'),
('Vellore Institute of Technology', 'Vellore', 'Vellore', 'Tamil Nadu', 'Engineering', 1984, 15, 'NIRF Ranking: 15', 'AICTE, UGC', 'Deemed University', 'info@vit.ac.in', '+91-416-220-2000', 'https://vit.ac.in'),

-- Medical Colleges
('All Institute of Medical Sciences Delhi', 'Ansari Nagar, New Delhi', 'New Delhi', 'Delhi', 'Medical', 1956, 1, 'NIRF Medical Ranking: 1', 'MCI, UGC', 'Autonomous', 'info@aiims.edu', '+91-11-2658-8500', 'https://www.aiims.edu'),
('Post Graduate Institute of Medical Education and Research', 'Chandigarh', 'Chandigarh', 'Chandigarh', 'Medical', 1962, 2, 'NIRF Medical Ranking: 2', 'MCI, UGC', 'Autonomous', 'info@pgimer.edu.in', '+91-172-275-6565', 'https://www.pgimer.edu.in'),
('Christian Medical College Vellore', 'Vellore', 'Vellore', 'Tamil Nadu', 'Medical', 1900, 3, 'NIRF Medical Ranking: 3', 'MCI, UGC', 'Deemed University', 'info@cmcvellore.ac.in', '+91-416-228-1000', 'https://www.cmcvellore.ac.in'),
('King Georges Medical University', 'Lucknow', 'Lucknow', 'Uttar Pradesh', 'Medical', 1905, 4, 'NIRF Medical Ranking: 4', 'MCI, UGC', 'State University', 'info@kgmcindia.edu', '+91-522-225-8800', 'https://www.kgmcindia.edu'),
('Sanjay Gandhi Postgraduate Institute of Medical Sciences', 'Lucknow', 'Lucknow', 'Uttar Pradesh', 'Medical', 1983, 5, 'NIRF Medical Ranking: 5', 'MCI, UGC', 'Autonomous', 'info@sgpgi.ac.in', '+91-522-249-4401', 'https://www.sgpgi.ac.in'),
('Banaras Hindu University Institute of Medical Sciences', 'Varanasi', 'Varanasi', 'Uttar Pradesh', 'Medical', 1960, 6, 'NIRF Medical Ranking: 6', 'MCI, UGC', 'Central University', 'info@bhu.ac.in', '+91-542-236-7568', 'https://www.bhu.ac.in'),
('Jawaharlal Institute of Postgraduate Medical Education and Research', 'Puducherry', 'Puducherry', 'Puducherry', 'Medical', 1956, 7, 'NIRF Medical Ranking: 7', 'MCI, UGC', 'Central University', 'info@jipmer.edu.in', '+91-413-229-6000', 'https://www.jipmer.edu.in'),
('Kasturba Medical College Manipal', 'Manipal', 'Manipal', 'Karnataka', 'Medical', 1953, 8, 'NIRF Medical Ranking: 8', 'MCI, UGC', 'Deemed University', 'info@manipal.edu', '+91-820-292-1000', 'https://manipal.edu'),

-- International Colleges
('Massachusetts Institute of Technology', 'Cambridge, MA', 'Cambridge', 'Massachusetts', 'Engineering', 1861, NULL, 'QS World Ranking: 1', 'ABET', 'Private', 'info@mit.edu', '+1-617-253-1000', 'https://www.mit.edu'),
('Stanford University', 'Stanford, CA', 'Stanford', 'California', 'Engineering', 1885, NULL, 'QS World Ranking: 3', 'ABET', 'Private', 'info@stanford.edu', '+1-650-723-2300', 'https://www.stanford.edu'),
('University of Cambridge', 'Cambridge', 'Cambridge', 'England', 'Engineering', 1209, NULL, 'QS World Ranking: 2', 'Royal Charter', 'Public', 'info@cam.ac.uk', '+44-1223-337733', 'https://www.cam.ac.uk'),
('University of Oxford', 'Oxford', 'Oxford', 'England', 'Engineering', 1096, NULL, 'QS World Ranking: 4', 'Royal Charter', 'Public', 'info@ox.ac.uk', '+44-1865-270000', 'https://www.ox.ac.uk'),
('California Institute of Technology', 'Pasadena, CA', 'Pasadena', 'California', 'Engineering', 1891, NULL, 'QS World Ranking: 6', 'ABET', 'Private', 'info@caltech.edu', '+1-626-395-6811', 'https://www.caltech.edu'),
('ETH Zurich', 'Zurich', 'Zurich', 'Switzerland', 'Engineering', 1855, NULL, 'QS World Ranking: 7', 'Swiss Accreditation', 'Public', 'info@ethz.ch', '+41-44-632-1111', 'https://ethz.ch'),
('Imperial College London', 'London', 'London', 'England', 'Engineering', 1907, NULL, 'QS World Ranking: 8', 'Royal Charter', 'Public', 'info@imperial.ac.uk', '+44-20-7589-5111', 'https://www.imperial.ac.uk'),
('University College London', 'London', 'London', 'England', 'Engineering', 1826, NULL, 'QS World Ranking: 9', 'Royal Charter', 'Public', 'info@ucl.ac.uk', '+44-20-7679-2000', 'https://www.ucl.ac.uk'),

-- Medical Colleges International
('Harvard Medical School', 'Boston, MA', 'Boston', 'Massachusetts', 'Medical', 1782, NULL, 'QS Medical Ranking: 1', 'LCME', 'Private', 'info@hms.harvard.edu', '+1-617-432-1000', 'https://hms.harvard.edu'),
('Johns Hopkins School of Medicine', 'Baltimore, MD', 'Baltimore', 'Maryland', 'Medical', 1893, NULL, 'QS Medical Ranking: 2', 'LCME', 'Private', 'info@jhmi.edu', '+1-410-955-5000', 'https://www.hopkinsmedicine.org'),
('University of Oxford Medical School', 'Oxford', 'Oxford', 'England', 'Medical', 1546, NULL, 'QS Medical Ranking: 3', 'GMC', 'Public', 'medical@ox.ac.uk', '+44-1865-270000', 'https://www.medsci.ox.ac.uk'),
('University of Cambridge School of Medicine', 'Cambridge', 'Cambridge', 'England', 'Medical', 1540, NULL, 'QS Medical Ranking: 4', 'GMC', 'Public', 'medical@cam.ac.uk', '+44-1223-337733', 'https://www.medschl.cam.ac.uk');
