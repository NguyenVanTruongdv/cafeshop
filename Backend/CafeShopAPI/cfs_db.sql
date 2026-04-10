-- =========================
-- CREATE DATABASE
-- =========================

USE cfs_db;

-- =========================
-- USER
-- =========================
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    role VARCHAR(20)
) ENGINE=InnoDB;

-- =========================
-- CATEGORY
-- =========================
CREATE TABLE category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    description VARCHAR(255)
) ENGINE=InnoDB;

-- =========================
-- PRODUCT
-- =========================
CREATE TABLE product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150),
    description TEXT,
    category_id INT,

    CONSTRAINT fk_product_category
    FOREIGN KEY (category_id)
    REFERENCES category(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- =========================
-- PRODUCT VARIANT (KHỐI LƯỢNG 🔥)
-- =========================
CREATE TABLE product_variant (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    weight VARCHAR(50), -- 250g, 500g, 1kg
    price DECIMAL(10,2),
    stock INT DEFAULT 0,

    CONSTRAINT fk_variant_product
    FOREIGN KEY (product_id)
    REFERENCES product(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================
-- PRODUCT IMAGE
-- =========================
CREATE TABLE product_image (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    image_url VARCHAR(255),
    is_main BOOLEAN DEFAULT FALSE,

    CONSTRAINT fk_productimage_product
    FOREIGN KEY (product_id)
    REFERENCES product(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================
-- CART
-- =========================
CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,

    CONSTRAINT fk_cart_user
    FOREIGN KEY (user_id)
    REFERENCES user(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================
-- CART ITEM (DÙNG VARIANT)
-- =========================
CREATE TABLE cart_item (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT NOT NULL,
    variant_id INT NOT NULL,
    quantity INT NOT NULL,

    CONSTRAINT fk_cartitem_cart
    FOREIGN KEY (cart_id)
    REFERENCES cart(id)
    ON DELETE CASCADE,

    CONSTRAINT fk_cartitem_variant
    FOREIGN KEY (variant_id)
    REFERENCES product_variant(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================
-- ADDRESS
-- =========================
CREATE TABLE address (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    address_detail VARCHAR(255),
    latitude DOUBLE,
    longitude DOUBLE,

    CONSTRAINT fk_address_user
    FOREIGN KEY (user_id)
    REFERENCES user(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================
-- ORDER
-- =========================
CREATE TABLE `order` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    address_id INT NOT NULL,
    total_amount DECIMAL(10,2),
    status VARCHAR(50),
    payment_method VARCHAR(50),

    CONSTRAINT fk_order_user
    FOREIGN KEY (user_id)
    REFERENCES user(id)
    ON DELETE RESTRICT,

    CONSTRAINT fk_order_address
    FOREIGN KEY (address_id)
    REFERENCES address(id)
    ON DELETE RESTRICT
) ENGINE=InnoDB;

-- =========================
-- ORDER DETAIL (DÙNG VARIANT 🔥)
-- =========================
CREATE TABLE order_detail (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    variant_id INT NOT NULL,
    quantity INT,
    price DECIMAL(10,2), -- giá tại thời điểm mua

    CONSTRAINT fk_orderdetail_order
    FOREIGN KEY (order_id)
    REFERENCES `order`(id)
    ON DELETE CASCADE,

    CONSTRAINT fk_orderdetail_variant
    FOREIGN KEY (variant_id)
    REFERENCES product_variant(id)
    ON DELETE RESTRICT
) ENGINE=InnoDB;

-- =========================
-- CATEGORY
-- =========================
INSERT INTO category (name, description) VALUES
('Cà phê hạt', 'Cà phê nguyên chất'),
('Cà phê rang xay', 'Cà phê đã xay sẵn');

-- =========================
-- USER
-- =========================
INSERT INTO user (name, email, password, role) VALUES
('Admin', 'admin@gmail.com', '123456', 'Admin'),
('Nguyen Van A', 'user1@gmail.com', '123456', 'Customer');

-- =========================
-- PRODUCT
-- =========================
INSERT INTO product (name, description, category_id) VALUES
('Cà phê Arabica', 'Hương vị chua nhẹ, thơm', 1),
('Cà phê Robusta', 'Đậm, mạnh, nhiều caffeine', 1);

-- =========================
-- PRODUCT VARIANT (KHỐI LƯỢNG)
-- =========================
INSERT INTO product_variant (product_id, weight, price, stock) VALUES
-- Arabica
(1, '250g', 80000, 100),
(1, '500g', 150000, 80),
(1, '1kg', 280000, 50),

-- Robusta
(2, '250g', 60000, 120),
(2, '500g', 110000, 90),
(2, '1kg', 200000, 60);

-- =========================
-- PRODUCT IMAGE
-- =========================
INSERT INTO product_image (product_id, image_url, is_main) VALUES
-- Arabica
(1, 'https://res.cloudinary.com/dbjdhcsrl/image/upload/v1775791697/ahh08zkn6mgjiltuwqmf.jpg', TRUE),
(1, 'arabica_1.jpg', FALSE),
(1, 'arabica_2.jpg', FALSE),

-- Robusta
(2, 'https://res.cloudinary.com/dbjdhcsrl/image/upload/v1775791696/qxzl38lwhw1oudmmxsh1.jpg', TRUE),
(2, 'robusta_1.jpg', FALSE);

-- =========================
-- CART
-- =========================
INSERT INTO cart (user_id) VALUES
(2);

-- =========================
-- CART ITEM
-- =========================
INSERT INTO cart_item (cart_id, variant_id, quantity) VALUES
(1, 1, 2), -- Arabica 250g
(1, 4, 1); -- Robusta 250g

-- =========================
-- ADDRESS
-- =========================
INSERT INTO address (user_id, address_detail, latitude, longitude) VALUES
(2, 'Dĩ An, Bình Dương', 10.9068, 106.7694);

-- =========================
-- ORDER
-- =========================
INSERT INTO `order` (user_id, address_id, total_amount, status, payment_method) VALUES
(2, 1, 220000, 'Pending', 'COD');

-- =========================
-- ORDER DETAIL
-- =========================
INSERT INTO order_detail (order_id, variant_id, quantity, price) VALUES
(1, 1, 2, 80000), -- Arabica 250g (giá tại thời điểm mua)
(1, 4, 1, 60000); -- Robusta 250g