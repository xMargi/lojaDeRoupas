import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function ShopSubmenu() {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <button className="uppercase text-white font-medium tracking-wider">Shop</button>

            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, left: 0,}}
                        animate={{ height: 470, opacity: 1, left: -675 }}
                        exit={{ height: 0, opacity: 0, }}
                        transition={{ duration: 0.1 }}
                        className="absolute left-0 top-full w-screen bg-[#BC9977] overflow-hidden z-50"
                    >
                        <div className="flex h-full">
                            {/* Lado esquerdo - categorias */}
                            <div className="w-2/3 h-full px-16 py-10 grid grid-cols-5 gap-8 text-white text-sm">
                                <div>
                                    <h3 className="font-bold mb-2">LANÇAMENTOS</h3>
                                    <ul>
                                        <li>New Step</li>
                                        <li>Boldwear x Sprite</li>
                                        <li>Boldwear x Corinthians</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold mb-2">VESTUÁRIO</h3>
                                    <ul>
                                        <li>Camisetas</li>
                                        <li>Calças</li>
                                        <li>Tops</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold mb-2">ACESSÓRIOS</h3>
                                    <ul>
                                        <li>Bonés</li>
                                        <li>Eyewear</li>
                                        <li>Bags</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold mb-2">UNDERWEAR</h3>
                                    <ul>
                                        <li>Tops</li>
                                        <li>Calcinhas</li>
                                        <li>Cuecas</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold mb-2">FOOTWEAR</h3>
                                    <ul>
                                        <li>Chinelos</li>
                                        <li>Meias</li>
                                        <li>Tênis</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Lado direito - imagem */}
                            <div className="w-1/3 h-full mt-10">
                                <img
                                    src="/banner/banner1.jpeg"
                                    alt="Coleção"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
