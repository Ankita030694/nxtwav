import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GramophonePlayer } from "@/components/GramophonePlayer";
import { 
  Disc3, 
  BarChart3, 
  Tag, 
  ListMusic, 
  Award,
  ExternalLink
} from "lucide-react";

interface ViralHit {
  id: string;
  title: string;
  artist: string;
  designation: string;
  releaseDate: string;
  coverArt: string;
  audioUrl: string;
  metrics: {
    streams: string;
    chartPosition: string;
    labelStatus: string;
    playlists: string;
    awards?: string;
  };
  testimonial: {
    quote: string;
    attribution: string;
  };
  streamingLinks: {
    spotify?: string;
    appleMusic?: string;
    youtubeMusic?: string;
    amazonMusic?: string;
    soundcloud?: string;
    beatport?: string;
  };
}

const viralHits: ViralHit[] = [
  {
    id: "1",
    title: "Midnight Frequencies",
    artist: "Maya Singh",
    designation: "NXTwav Producer",
    releaseDate: "Dec 15, 2025",
    coverArt: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    metrics: {
      streams: "2.4M",
      chartPosition: "#3 on Beatport Melodic House",
      labelStatus: "Signed to Anjunadeep",
      playlists: "Featured on 128 playlists",
      awards: "Best New Artist 2025",
    },
    testimonial: {
      quote: "NXTwav didn't just teach me production - they taught me how to think like a professional. The mentorship changed everything.",
      attribution: "Maya Singh, after signing to Anjunadeep",
    },
    streamingLinks: {
      spotify: "#",
      appleMusic: "#",
      youtubeMusic: "#",
      amazonMusic: "#",
      soundcloud: "#",
      beatport: "#",
    },
  },
  {
    id: "2",
    title: "Solar Flare",
    artist: "Arjun Kapoor",
    designation: "NXTwav DJ & Producer",
    releaseDate: "Nov 28, 2025",
    coverArt: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    metrics: {
      streams: "1.8M",
      chartPosition: "#12 on Spotify Viral 50",
      labelStatus: "Independent Release",
      playlists: "Featured on 87 playlists",
    },
    testimonial: {
      quote: "The career roadmap at NXTwav helped me understand the business side. I released independently and kept 100% of my royalties.",
      attribution: "Arjun Kapoor, Independent Artist",
    },
    streamingLinks: {
      spotify: "#",
      appleMusic: "#",
      youtubeMusic: "#",
      soundcloud: "#",
    },
  },
  {
    id: "3",
    title: "Neon Dreams",
    artist: "Priya Sharma",
    designation: "NXTwav Sound Designer",
    releaseDate: "Oct 10, 2025",
    coverArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    metrics: {
      streams: "3.1M",
      chartPosition: "#1 on Apple Music Electronic",
      labelStatus: "Signed to Spinnin' Records",
      playlists: "Featured on 215 playlists",
      awards: "MTV EMA Nomination",
    },
    testimonial: {
      quote: "From zero knowledge to a major label deal in 18 months. NXTwav's structured approach made it possible.",
      attribution: "Priya Sharma, Spinnin' Records Artist",
    },
    streamingLinks: {
      spotify: "#",
      appleMusic: "#",
      youtubeMusic: "#",
      amazonMusic: "#",
      beatport: "#",
    },
  },
];

const streamingIcons = {
  spotify: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  ),
  appleMusic: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.802.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525 0 1.048-.034 1.57-.1.823-.106 1.597-.35 2.296-.81a5.046 5.046 0 001.88-2.208c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.042-1.8-.6-1.965-1.483-.18-.965.455-1.96 1.395-2.2.37-.09.75-.14 1.12-.2.38-.06.77-.09 1.13-.21.36-.12.59-.35.66-.73.01-.1.03-.19.03-.29V9.28c0-.33-.16-.53-.49-.6l-4.4-.98c-.09-.02-.18-.03-.27-.03-.29 0-.44.15-.47.44v7.17c0 .44-.05.87-.26 1.27-.29.58-.76.96-1.39 1.14-.35.09-.71.15-1.07.17-.94.04-1.79-.6-1.96-1.49-.18-.96.46-1.96 1.4-2.2.37-.09.75-.14 1.12-.2.38-.06.76-.09 1.12-.21.37-.12.59-.36.66-.74.01-.08.02-.17.02-.26V6.53c0-.18.02-.36.08-.53.1-.3.33-.47.63-.53.18-.03.36-.05.55-.09l5.68-1.25c.08-.02.17-.03.26-.04.37-.02.6.19.62.57v5.45l.01.01z"/>
    </svg>
  ),
  youtubeMusic: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z"/>
    </svg>
  ),
  amazonMusic: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.7-3.182v.685zm3.186 7.705a.659.659 0 01-.745.074c-1.048-.869-1.235-1.273-1.812-2.102-1.732 1.767-2.962 2.297-5.209 2.297-2.659 0-4.731-1.64-4.731-4.925 0-2.566 1.391-4.313 3.37-5.17 1.715-.753 4.11-.891 5.942-1.095v-.41c0-.753.058-1.64-.384-2.29-.385-.578-1.124-.82-1.773-.82-1.205 0-2.277.618-2.54 1.897-.054.285-.261.567-.549.582l-3.061-.333c-.259-.057-.548-.266-.472-.66C6.079 1.82 9.064.636 11.759.636c1.391 0 3.209.371 4.302 1.424 1.391 1.298 1.258 3.03 1.258 4.916v4.453c0 1.339.555 1.926 1.079 2.649.182.257.223.564-.009.751-.58.489-1.612 1.398-2.178 1.907l-.067.058zm5.049-14.412v-.003c-.109-.196-.227-.379-.357-.545a7.313 7.313 0 00-.4-.468c-.129-.129-.262-.245-.403-.346a7.135 7.135 0 00-.445-.318 7.095 7.095 0 00-.477-.273c-.16-.082-.326-.156-.494-.222a7.09 7.09 0 00-.509-.17 6.993 6.993 0 00-.518-.116 6.94 6.94 0 00-.522-.059 7.128 7.128 0 00-.522-.001c-.086.003-.171.009-.256.018l-.112.016c-.118.019-.236.042-.352.071l-.106.03a4.982 4.982 0 00-.337.103l-.099.036c-.11.044-.219.093-.325.147l-.089.044a3.51 3.51 0 00-.305.178c-.027.018-.054.038-.08.058a2.87 2.87 0 00-.275.216c-.022.019-.043.039-.064.06-.079.075-.155.155-.227.239-.017.019-.032.04-.048.059-.067.082-.131.168-.19.258-.013.019-.025.039-.037.058-.058.092-.112.188-.161.288-.009.018-.016.037-.024.056-.047.103-.09.209-.128.319-.006.019-.011.039-.017.058a3.58 3.58 0 00-.089.347l-.008.044c-.022.121-.037.244-.046.369l-.002.035a4.09 4.09 0 00.003.4c.002.045.006.089.011.133.008.071.019.142.033.212.006.03.013.06.02.09.016.056.034.112.054.167.011.031.023.061.036.091.018.041.037.082.058.122.02.037.041.074.064.11.018.029.037.056.057.084.024.033.049.065.075.096.027.032.056.062.086.091l.045.043c.039.036.08.07.122.103l.024.018c.049.037.1.072.153.105l.017.01c.058.035.118.067.18.097l.019.009c.065.031.132.059.2.084l.022.008c.071.026.143.049.217.07l.027.007c.076.02.154.038.232.053l.032.006c.081.015.163.026.246.035l.034.003c.087.008.175.013.263.014h.035c.092 0 .184-.005.276-.014l.029-.003c.088-.009.176-.023.263-.041l.024-.005c.086-.019.17-.043.253-.07l.017-.006c.08-.028.159-.06.236-.095l.014-.006c.074-.035.147-.074.218-.116.006-.004.013-.007.019-.011.067-.041.133-.086.196-.134.059-.046.117-.095.172-.146.022-.021.043-.044.064-.066.045-.05.088-.101.128-.155.016-.022.03-.045.046-.068.034-.051.066-.104.095-.159.012-.022.023-.046.033-.069.026-.054.049-.109.07-.165.009-.024.016-.049.024-.074.018-.057.033-.116.045-.175.005-.025.009-.05.013-.076.01-.061.016-.123.02-.186.002-.028.003-.057.003-.086l-.001-.105a2.72 2.72 0 00-.022-.211c-.006-.039-.015-.077-.024-.115-.014-.055-.031-.109-.051-.162-.012-.032-.026-.064-.041-.095-.022-.047-.048-.092-.076-.136-.018-.028-.038-.055-.058-.081-.032-.04-.067-.078-.104-.114-.025-.024-.052-.046-.08-.067-.043-.033-.088-.063-.136-.091-.033-.019-.068-.036-.104-.051-.052-.022-.106-.041-.161-.057-.041-.011-.083-.02-.126-.027-.058-.009-.117-.014-.176-.016-.047-.001-.094 0-.141.003-.061.005-.121.013-.18.025-.046.01-.091.021-.135.035-.056.018-.111.039-.164.063-.042.02-.082.041-.122.065-.05.03-.098.062-.144.097-.037.029-.073.06-.107.092-.044.043-.086.089-.125.137-.031.039-.06.08-.086.122-.035.056-.066.114-.093.174-.022.05-.041.102-.057.155-.021.07-.037.141-.048.214-.009.059-.014.119-.015.179v.031c0 .06.004.119.011.178z"/>
    </svg>
  ),
  soundcloud: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.06-.052-.1-.084-.1m-.899.828c-.06 0-.091.037-.104.094L0 14.479l.165 1.308c.014.057.045.094.09.094s.089-.037.099-.094l.19-1.308-.19-1.332c-.01-.057-.044-.094-.074-.094m1.83-1.229c-.061 0-.12.045-.12.104l-.21 2.563.225 2.458c0 .06.045.104.106.104.061 0 .12-.044.12-.104l.24-2.474-.24-2.547c0-.06-.051-.104-.121-.104m.945-.089c-.075 0-.135.06-.15.135l-.193 2.64.21 2.544c.016.077.075.138.149.138.075 0 .135-.061.15-.138l.24-2.544-.24-2.64c-.015-.075-.06-.135-.166-.135m.96-.091c-.089 0-.165.075-.165.164l-.21 2.731.224 2.594c0 .089.061.164.149.164.09 0 .165-.075.165-.164l.254-2.594-.254-2.731c-.016-.089-.076-.164-.163-.164m1.005-.105c-.104 0-.18.076-.18.179l-.21 2.836.24 2.609c0 .104.074.18.165.18.104 0 .18-.076.18-.18l.24-2.609-.24-2.836c-.016-.103-.076-.179-.195-.179m1.035-.12c-.119 0-.21.091-.21.209l-.225 2.956.24 2.609c0 .119.09.21.21.21.119 0 .21-.091.21-.21l.255-2.609-.241-2.956c-.014-.118-.104-.209-.239-.209m1.05-.135c-.135 0-.24.105-.24.24l-.225 3.091.254 2.609c0 .135.09.239.225.239.119 0 .225-.104.225-.239l.27-2.609-.256-3.091c-.014-.135-.119-.24-.253-.24m1.08-.15c-.149 0-.27.12-.27.27l-.21 3.24.24 2.594c0 .149.119.27.27.27.149 0 .27-.121.27-.27l.24-2.594-.24-3.24c-.015-.15-.121-.27-.3-.27m1.095-.195c-.164 0-.3.135-.3.3l-.209 3.434.239 2.564c0 .164.12.299.285.299.149 0 .284-.135.284-.299l.256-2.564-.242-3.434c-.014-.165-.134-.3-.313-.3m1.11-.166c-.18 0-.33.149-.33.329l-.21 3.601.226 2.563c0 .18.135.33.315.33.165 0 .315-.15.315-.33l.24-2.563-.241-3.601c-.014-.18-.149-.329-.315-.329m1.665.18c-.09 0-.18.045-.256.105-.059.045-.09.12-.09.195l-.21 3.255.24 2.534c0 .165.12.3.27.315h.03c.165 0 .3-.12.315-.285l.256-2.564-.256-3.285c0-.18-.15-.27-.299-.27m.48-.18c-.18 0-.345.165-.345.361l-.21 3.435.225 2.518c0 .18.15.346.345.346.179 0 .33-.165.33-.346l.24-2.518-.24-3.435c0-.196-.149-.361-.345-.361m1.065 3.256c-.105 0-.18.045-.254.105-.061.059-.091.135-.091.209v.061l-.21 3.061.24 2.504c0 .18.135.33.315.33.18 0 .33-.15.33-.33l.24-2.504-.24-3.151c-.015-.18-.165-.285-.33-.285m.96-.36c-.195 0-.36.165-.36.375l-.21 3.42.241 2.489c0 .195.15.36.359.36.195 0 .36-.165.36-.36l.24-2.489-.24-3.42c0-.21-.164-.375-.39-.375m4.141.839c-.18 0-.359.03-.524.074-.106-1.17-1.095-2.074-2.294-2.074-.301 0-.599.045-.87.135-.119.045-.179.09-.179.18v5.355c0 .09.06.165.149.18h3.718c.991 0 1.8-.809 1.8-1.8 0-.992-.809-1.8-1.8-1.8-.015 0-.015-.06 0-.05z"/>
    </svg>
  ),
  beatport: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M21.429 17.055c-.636 1.268-1.907 2.11-3.297 2.11-2.048 0-3.713-1.625-3.713-3.623 0-.414.07-.811.199-1.182H8.382c.129.371.199.768.199 1.182 0 1.998-1.665 3.623-3.714 3.623-1.39 0-2.66-.842-3.296-2.11-.636-1.267-.453-2.712.453-3.799.906-1.087 2.375-1.58 3.713-1.268l5.692-4.921c-.323-.636-.453-1.354-.388-2.072.129-1.389.97-2.596 2.235-3.169 1.266-.573 2.726-.389 3.843.508 1.117.897 1.648 2.284 1.413 3.656-.236 1.372-1.155 2.497-2.438 2.99l1.035 6.355c1.337-.311 2.807.182 3.713 1.269.906 1.086 1.088 2.531.452 3.798l.135-.767zM4.867 18.39c1.429 0 2.589-1.131 2.589-2.525 0-1.395-1.16-2.526-2.59-2.526-1.43 0-2.589 1.131-2.589 2.526 0 1.394 1.16 2.525 2.59 2.525zm13.265 0c1.43 0 2.59-1.131 2.59-2.525 0-1.395-1.16-2.526-2.59-2.526-1.43 0-2.589 1.131-2.589 2.526 0 1.394 1.16 2.525 2.59 2.525zM12 7.476a2.476 2.476 0 100-4.952 2.476 2.476 0 000 4.952z"/>
    </svg>
  ),
};

export function ViralHitsSection() {
  const [currentHitIndex, setCurrentHitIndex] = useState(0);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-glow opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
            🔥 Viral Hits
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Tracks That <span className="text-gradient">Broke the Internet</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            These are the sounds of our community. Real tracks, real streams, real success stories 
            from NXTwav artists making waves worldwide.
          </p>
        </div>

        {/* Hits List */}
        <div className="space-y-12">
          {viralHits.map((hit, index) => (
            <div
              key={hit.id}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-8 lg:gap-12 items-center`}
            >
              {/* Gramophone Player */}
              <div className="w-full lg:w-1/2">
                <GramophonePlayer
                  audioUrl={hit.audioUrl}
                  coverArt={hit.coverArt}
                  title={hit.title}
                  artist={hit.artist}
                />
              </div>

              {/* Hit Details */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{hit.releaseDate}</p>
                  <h3 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
                    {hit.title}
                  </h3>
                  <p className="text-lg text-primary">
                    {hit.artist} <span className="text-muted-foreground">• {hit.designation}</span>
                  </p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                    <Disc3 className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-2xl font-bold text-foreground">{hit.metrics.streams}</p>
                      <p className="text-xs text-muted-foreground">Total Streams</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                    <BarChart3 className="w-5 h-5 text-accent mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{hit.metrics.chartPosition}</p>
                      <p className="text-xs text-muted-foreground">Chart Position</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                    <Tag className="w-5 h-5 text-secondary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{hit.metrics.labelStatus}</p>
                      <p className="text-xs text-muted-foreground">Label Status</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                    <ListMusic className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{hit.metrics.playlists}</p>
                      <p className="text-xs text-muted-foreground">Playlist Features</p>
                    </div>
                  </div>
                  {hit.metrics.awards && (
                    <div className="col-span-2 flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20">
                      <Award className="w-5 h-5 text-amber-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-amber-400">{hit.metrics.awards}</p>
                        <p className="text-xs text-muted-foreground">Award / Recognition</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Testimonial */}
                <blockquote className="border-l-4 border-primary pl-4 py-2">
                  <p className="text-muted-foreground italic mb-2">"{hit.testimonial.quote}"</p>
                  <cite className="text-sm text-foreground not-italic">- {hit.testimonial.attribution}</cite>
                </blockquote>

                {/* Streaming Links */}
                <div>
                  <p className="text-sm text-muted-foreground mb-3">Listen on:</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(hit.streamingLinks).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                        title={platform}
                      >
                        {streamingIcons[platform as keyof typeof streamingIcons]}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-16">
          <Button variant="outline" size="lg" className="border-border text-foreground hover:bg-muted">
            Load More Hits
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
