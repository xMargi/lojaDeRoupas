interface ProductDescriptionProps {
  tableRef: React.RefObject<HTMLDivElement | null>; // <- aceita null agora
}

export const ProductDescription = ({ tableRef }: ProductDescriptionProps) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      {/* Tabela de Medidas */}
      <div ref={tableRef}>
        <img
          src="/tabelaMedidas/tabela.png"
          alt="Tabela de Medidas"
          className="w-full max-w-xl mx-auto rounded-lg shadow mt-5"
        />
      </div>

      {/* Descrição do Produto */}
      <div className="prose max-w-2xl mx-auto text-gray-700">
        <h2 className="text-xl font-semibold text-[#09122C] mb-2 text-center pt-3 pb-5">
          Descrição do Produto
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit unde cupiditate dicta voluptatum sint adipisci assumenda officiis nisi a recusandae, ut minima accusamus quos et quas porro perferendis! Ad, vel.
          Cumque dignissimos hic corporis ex blanditiis, est soluta non dolores odio nisi adipisci inventore, asperiores animi nulla, officia debitis aliquam ut. Tempora, beatae cumque? Nobis quis enim illum at fuga.
          Expedita, ipsum dolorem! Quis adipisci delectus distinctio quia nam sint architecto minima blanditiis nobis quod repudiandae nisi maxime dolorem deleniti dignissimos natus error recusandae, aspernatur assumenda et nemo ipsam corporis!
          Quos odio harum praesentium ea voluptate perferendis fuga accusamus animi expedita? Quibusdam distinctio repellendus aperiam repellat quae. Quaerat, laudantium sed atque corporis voluptates odio alias vitae culpa impedit, explicabo ducimus!
          Sed, beatae autem maxime eius sunt ex provident eveniet ipsa ut asperiores quos nemo magni minima! Ad nesciunt amet quia voluptas eius! Neque debitis fugit sunt necessitatibus aspernatur quis dolore!
        </p>
      </div>
    </div>
  );
};
