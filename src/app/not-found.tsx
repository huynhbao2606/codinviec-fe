"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptopCode, faArrowLeft, faServer } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { motion } from "framer-motion";
import ContainerPage from "@/components/ui/container/page";

export default function NotFound() {
    return (
        <ContainerPage className="flex flex-col items-center justify-center text-center py-24 relative overflow-hidden">
            <motion.div
                className="absolute top-1/4 left-1/3 w-80 h-80 bg-primary-100 rounded-full blur-3xl opacity-30"
                animate={{ y: [0, -30, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-secondary-100 rounded-full blur-3xl opacity-30"
                animate={{ y: [0, 30, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="mb-6 text-primary-400 relative z-10 "
            >
                <FontAwesomeIcon icon={faLaptopCode} className="text-9xl drop-shadow-md" />
            </motion.div>

            <motion.h1
                className="text-4xl font-bold text-primary-700 mb-3 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                404 - Trang không tồn tại
            </motion.h1>

            <motion.p
                className="text-secondary-500 mb-8 max-w-md relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
            >
                Trang này chưa thêm gì hết
                <br />
                Hãy quay lại khi nào có là được!
            </motion.p>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.4 }}
                className="relative z-10"
            >
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white
                     bg-primary-500 hover:bg-primary-600 transition-all shadow-md hover:shadow-lg"
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                    Quay lại trang chủ
                </Link>
            </motion.div>

            <motion.div
                className="absolute bottom-10 right-10 text-secondary-300 text-3xl"
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <FontAwesomeIcon icon={faServer} />
            </motion.div>
        </ContainerPage>
    );
}
