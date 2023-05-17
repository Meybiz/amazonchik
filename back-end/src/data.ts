import { User } from "./model/userModel";
import { Product } from "./model/prodModel";
import bcrypt from "bcryptjs";

export const sampleProd: Product[] = [
    {
        name: "Nike Футболка",
        slug: "nike-shirt",
        category: "Shirts",
        image: "../images/p1.jpg",
        price: 50,
        brand: "Nike",
        rating: 4.5,
        numReviews: 10,
        countInStock: 10,
        description: "Легкая футболка для повседневного спорта",
    },
    {
        name: "Jordan Футболка",
        slug: "jordan-shirt",
        category: "Shirts",
        image: "../images/p2.jpg",
        price: 59,
        brand: "Jordan",
        rating: 4.8,
        numReviews: 16,
        countInStock: 20,
        description: "Легкая футболка для повседневного спорта",
    },
    {
        name: "Puma Футболка",
        slug: "puma-shirt",
        category: "Shirts",
        image: "../images/p3.jpg",
        price: 50,
        brand: "Nike",
        rating: 4.0,
        numReviews: 12,
        countInStock: 9,
        description: "Легкая футболка для повседневного спорта",
    },
    {
        name: "Nike Штаны",
        slug: "nike-pants",
        category: "Pants",
        image: "../images/p4.jpg",
        price: 39,
        brand: "Nike",
        rating: 4.9,
        numReviews: 3,
        countInStock: 0,
        description: "Легкие штаны для повседневного спорта",
    }
]


export const sampleUsers: User[] = [
    {
        name: 'Victor',
        email: 'admin@amazonchik.ru',
        password: bcrypt.hashSync('002003'),
        isAdmin: true
    },
    {
        name: 'Dasha',
        email: 'dasha@amazonchik.ru',
        password: bcrypt.hashSync('001003'),
        isAdmin: false
    },
    {
        name: 'Denis',
        email: 'denis@amazonchik.ru',
        password: bcrypt.hashSync('123456'),
        isAdmin: false
    },
]