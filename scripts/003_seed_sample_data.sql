-- Insert sample skills
INSERT INTO public.skills (name, category, description) VALUES
('Solar Panel Installation', 'Technical', 'Installing and mounting solar panels on rooftops and ground systems'),
('Electrical Wiring', 'Technical', 'Basic electrical wiring and connections for solar systems'),
('System Design', 'Technical', 'Designing solar energy systems based on energy requirements'),
('Safety Protocols', 'Safety', 'Understanding safety procedures for working with electrical systems'),
('Customer Service', 'Soft Skills', 'Communicating effectively with customers and clients'),
('Project Management', 'Management', 'Managing solar installation projects from start to finish'),
('Maintenance & Troubleshooting', 'Technical', 'Diagnosing and fixing issues with solar systems'),
('Energy Auditing', 'Technical', 'Assessing energy needs and efficiency of buildings')
ON CONFLICT (name) DO NOTHING;

-- Insert sample courses
INSERT INTO public.courses (title, description, category, nsqf_level, duration_hours, price, provider, rating, total_ratings, image_url) VALUES
('Solar Panel Installation Fundamentals', 'Learn the basics of solar panel installation including safety, tools, and techniques', 'Solar Energy', 4, 40, 15000.00, 'Green Energy Institute', 4.5, 127, '/placeholder.svg?height=200&width=300'),
('Electrical Systems for Solar', 'Understanding electrical systems, wiring, and connections for solar installations', 'Electrical', 4, 35, 12000.00, 'Technical Training Center', 4.3, 89, '/placeholder.svg?height=200&width=300'),
('Solar System Design & Planning', 'Advanced course on designing efficient solar energy systems', 'Solar Energy', 5, 50, 20000.00, 'Renewable Energy Academy', 4.7, 156, '/placeholder.svg?height=200&width=300'),
('Safety in Solar Installation', 'Comprehensive safety training for solar installation professionals', 'Safety', 3, 20, 8000.00, 'Safety First Training', 4.8, 203, '/placeholder.svg?height=200&width=300'),
('Customer Relations for Technicians', 'Developing customer service skills for technical professionals', 'Soft Skills', 3, 25, 10000.00, 'Professional Development Institute', 4.2, 78, '/placeholder.svg?height=200&width=300'),
('Solar Maintenance & Troubleshooting', 'Learn to maintain and troubleshoot solar energy systems', 'Solar Energy', 4, 30, 14000.00, 'Green Energy Institute', 4.4, 92, '/placeholder.svg?height=200&width=300')
ON CONFLICT DO NOTHING;

-- Link courses with skills
INSERT INTO public.course_skills (course_id, skill_id)
SELECT c.id, s.id FROM public.courses c, public.skills s
WHERE (c.title = 'Solar Panel Installation Fundamentals' AND s.name IN ('Solar Panel Installation', 'Safety Protocols'))
   OR (c.title = 'Electrical Systems for Solar' AND s.name IN ('Electrical Wiring', 'Safety Protocols'))
   OR (c.title = 'Solar System Design & Planning' AND s.name IN ('System Design', 'Energy Auditing', 'Project Management'))
   OR (c.title = 'Safety in Solar Installation' AND s.name = 'Safety Protocols')
   OR (c.title = 'Customer Relations for Technicians' AND s.name = 'Customer Service')
   OR (c.title = 'Solar Maintenance & Troubleshooting' AND s.name IN ('Maintenance & Troubleshooting', 'Safety Protocols'))
ON CONFLICT DO NOTHING;
