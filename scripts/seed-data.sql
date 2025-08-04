-- Insert sample organizations
INSERT INTO organizations (name, code) VALUES 
('Gourmet Kitchen Co.', 'GKC001'),
('Fine Dining Restaurant', 'FDR002'),
('Bakery Delights', 'BD003');

-- Insert sample users
INSERT INTO users (email, password_hash, full_name, role, organization_id, status) VALUES 
('admin@gourmet.com', '$2b$10$hash1', 'Admin User', 'admin', 1, 'active'),
('john.smith@gourmet.com', '$2b$10$hash2', 'John Smith', 'employee', 1, 'active'),
('sarah.johnson@gourmet.com', '$2b$10$hash3', 'Sarah Johnson', 'employee', 1, 'active'),
('mike.wilson@gourmet.com', '$2b$10$hash4', 'Mike Wilson', 'employee', 1, 'inactive'),
('emily.davis@gourmet.com', '$2b$10$hash5', 'Emily Davis', 'employee', 1, 'active');

-- Insert sample recipes
INSERT INTO recipes (name, description, category, prep_time, cook_time, servings, difficulty, ingredients, instructions, organization_id, created_by) VALUES 
(
    'Classic Chocolate Chip Cookies',
    'Soft and chewy chocolate chip cookies that are perfect for any occasion.',
    'Desserts',
    15,
    12,
    24,
    'Easy',
    '[
        {"ingredient": "All-purpose flour", "amount": "2 1/4", "unit": "cups"},
        {"ingredient": "Baking soda", "amount": "1", "unit": "tsp"},
        {"ingredient": "Salt", "amount": "1", "unit": "tsp"},
        {"ingredient": "Butter", "amount": "1", "unit": "cup"},
        {"ingredient": "Granulated sugar", "amount": "3/4", "unit": "cup"},
        {"ingredient": "Brown sugar", "amount": "3/4", "unit": "cup"},
        {"ingredient": "Vanilla extract", "amount": "2", "unit": "tsp"},
        {"ingredient": "Large eggs", "amount": "2", "unit": "pieces"},
        {"ingredient": "Chocolate chips", "amount": "2", "unit": "cups"}
    ]',
    '[
        {"step": 1, "instruction": "Preheat oven to 375°F (190°C)."},
        {"step": 2, "instruction": "In a medium bowl, whisk together flour, baking soda, and salt."},
        {"step": 3, "instruction": "In a large bowl, cream together butter and both sugars until light and fluffy."},
        {"step": 4, "instruction": "Beat in vanilla and eggs one at a time."},
        {"step": 5, "instruction": "Gradually mix in flour mixture until just combined."},
        {"step": 6, "instruction": "Stir in chocolate chips."},
        {"step": 7, "instruction": "Drop rounded tablespoons of dough onto ungreased baking sheets."},
        {"step": 8, "instruction": "Bake for 9-11 minutes or until golden brown."},
        {"step": 9, "instruction": "Cool on baking sheet for 2 minutes before removing to wire rack."}
    ]',
    1,
    1
),
(
    'Pasta Carbonara',
    'Traditional Italian pasta dish with eggs, cheese, and pancetta.',
    'Main Course',
    10,
    15,
    4,
    'Medium',
    '[
        {"ingredient": "Spaghetti", "amount": "1", "unit": "lb"},
        {"ingredient": "Pancetta", "amount": "6", "unit": "oz"},
        {"ingredient": "Large eggs", "amount": "4", "unit": "pieces"},
        {"ingredient": "Parmesan cheese", "amount": "1", "unit": "cup"},
        {"ingredient": "Black pepper", "amount": "1", "unit": "tsp"},
        {"ingredient": "Salt", "amount": "to taste", "unit": ""}
    ]',
    '[
        {"step": 1, "instruction": "Bring a large pot of salted water to boil and cook spaghetti according to package directions."},
        {"step": 2, "instruction": "While pasta cooks, dice pancetta and cook in a large skillet until crispy."},
        {"step": 3, "instruction": "In a bowl, whisk together eggs, grated Parmesan, and black pepper."},
        {"step": 4, "instruction": "Reserve 1 cup pasta water before draining."},
        {"step": 5, "instruction": "Add hot pasta to the skillet with pancetta."},
        {"step": 6, "instruction": "Remove from heat and quickly stir in egg mixture, adding pasta water as needed."},
        {"step": 7, "instruction": "Serve immediately with additional Parmesan and black pepper."}
    ]',
    1,
    1
);

-- Insert sample recipe notes
INSERT INTO recipe_notes (recipe_id, user_id, note, status) VALUES 
(1, 2, 'Could use a bit more vanilla extract for better flavor', 'pending'),
(2, 2, 'The cooking time seems a bit long, pasta was overcooked', 'reviewed'),
(1, 3, 'These cookies are amazing! Maybe add some sea salt on top?', 'pending');

-- Insert sample recipe views
INSERT INTO recipe_views (recipe_id, user_id) VALUES 
(1, 2),
(1, 3),
(2, 2),
(1, 4),
(2, 3);

-- Insert sample favorites
INSERT INTO user_favorites (user_id, recipe_id) VALUES 
(2, 1),
(3, 1),
(2, 2);
