import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "./models/User.js";

const MONGO_URI = process.env.MONGODB_URI || "";

// Add or remove entries here, then run: npx tsx seed.ts
const admins = [
    { name: "Alex Mercer", email: "admin@example.com", password: "admin123", phone: "9800000001" },
];

const seedAdmins = async () => {
    try {
        console.log("Connecting to Database...");
        await mongoose.connect(MONGO_URI);

        for (const admin of admins) {
            const existing = await User.findOne({ email: admin.email });
            if (existing) {
                console.log(`Admin ${admin.email} already exists, skipping.`);
                continue;
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(admin.password, salt);

            await User.create({
                name: admin.name,
                email: admin.email,
                password: hashedPassword,
                phone: admin.phone,
                role: "admin",
            });

            console.log(`Created admin: ${admin.email}`);
        }

        // To remove an admin instead of adding one, comment out the loop
        // above and use this instead:
        // await User.deleteOne({ email: "admin@example.com" });

        await mongoose.disconnect();
        console.log("Done.");
    } catch (error) {
        console.error("Seeding failed", error);
        process.exit(1);
    }
};

seedAdmins();