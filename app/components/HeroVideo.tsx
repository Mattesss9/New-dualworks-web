type HeroVideoProps = {
    src: string;
    poster?: string;
    caption?: string;
    className?: string;
};

export default function HeroVideo({ src, poster, caption, className = '' }: HeroVideoProps) {
    return (
        <div className={`relative w-full h-full overflow-hidden ${className}`}>
            <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster={poster}
                aria-label={caption || 'Hero video'}
            >
                <source src={src} />
            </video>
            {caption && (
                <div className="absolute left-0 bottom-0 w-full bg-black/50 text-white text-xs sm:text-sm px-4 py-2">
                    {caption}
                </div>
            )}
        </div>
    );
}
