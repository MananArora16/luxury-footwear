interface ProductCardProps {
  image: string
  name: string
  category: string
  description: string
}

export function ProductCard({ image, name, category, description }: ProductCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden bg-muted rounded-lg mb-4 h-80 sm:h-96">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="space-y-2">
        <p className="text-xs font-semibold text-primary tracking-widest uppercase">{category}</p>
        <h3 className="text-xl sm:text-2xl font-light text-foreground group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
