import { useEffect, useMemo, useState } from 'react'

const photos = [
  '/photos/photo1.jpg',
  '/photos/photo2.jpg',
  '/photos/photo3.jpg',
  '/photos/photo4.jpg',
  '/photos/photo5.jpg',
  '/photos/photo6.jpg',
  '/photos/photo7.jpg',
  '/photos/photo8.jpg',
]

const messages = ['I love you', 'Люблю тебя', 'Ты мое счастье']

export default function App() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768)

  useEffect(() => {
    const onResize = () => {
      const next = window.innerWidth <= 768
      setIsMobile((prev) => (prev === next ? prev : next))
    }

    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const perfConfig = useMemo(
    () => ({
      textCount: isMobile ? 42 : 95,
      photoCount: isMobile ? 4 : 8,
      starCount: isMobile ? 70 : 150,
    }),
    [isMobile],
  )

  const textRain = useMemo(
    () =>
      Array.from({ length: perfConfig.textCount }, (_, i) => ({
        id: i,
        left: 1 + ((i * 11.3) % 98),
        scale: (isMobile ? 0.46 : 0.5) + (i % 6) * (isMobile ? 0.09 : 0.12),
        duration: (isMobile ? 9 : 7.5) + (i % 7) * (isMobile ? 1.25 : 1.05),
        delay: (i % 12) * (isMobile ? 0.55 : 0.33),
        opacity: (isMobile ? 0.24 : 0.28) + (i % 5) * (isMobile ? 0.09 : 0.11),
        drift: (i % 2 === 0 ? 1 : -1) * (6 + (i % 4) * 4),
        text: i % 16 === 0 ? `${messages[(i + 1) % messages.length]} ❤️` : 'I love you❤️',
      })),
    [isMobile, perfConfig.textCount],
  )

  const photoRain = useMemo(
    () =>
      Array.from({ length: perfConfig.photoCount }, (_, i) => ({
        id: i,
        left: 5 + ((i * 18.2) % 90),
        scale: (isMobile ? 0.62 : 0.72) + (i % 4) * (isMobile ? 0.1 : 0.14),
        duration: (isMobile ? 20 : 17) + (i % 4) * (isMobile ? 2.2 : 1.9),
        delay: (i % 8) * (isMobile ? 1.5 : 1.15),
        drift: (i % 2 === 0 ? 1 : -1) * (isMobile ? 7 : 10),
        photo: photos[i % photos.length],
      })),
    [isMobile, perfConfig.photoCount],
  )

  const stars = useMemo(
    () =>
      Array.from({ length: perfConfig.starCount }, (_, i) => ({
        id: i,
        width: (i % 3) + 1,
        left: (i * 7) % 100,
        top: (i * 11) % 100,
        opacity: (isMobile ? 0.14 : 0.2) + (i % 5) * (isMobile ? 0.08 : 0.12),
      })),
    [isMobile, perfConfig.starCount],
  )

  return (
    <main className="page">
      <div className="background" />

      <div className="stars">
        {stars.map((star) => (
          <span
            key={star.id}
            className="star"
            style={{
              width: `${star.width}px`,
              height: `${star.width}px`,
              left: `${star.left}%`,
              top: `${star.top}%`,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      <section className="canvas">
        {textRain.map((item) => (
          <div
            key={item.id}
            className="rain-text"
            style={{
              left: `${item.left}%`,
              top: '-16vh',
              '--text-scale': item.scale,
              '--fall-duration': `${item.duration}s`,
              '--fall-delay': `${item.delay}s`,
              '--text-opacity': item.opacity,
              '--text-drift': `${item.drift}px`,
            }}
          >
            {item.text}
          </div>
        ))}

        {photoRain.map((item) => (
          <div
            key={item.id}
            className="rain-photo"
            style={{
              left: `${item.left}%`,
              top: '-24vh',
              '--photo-scale': item.scale,
              '--photo-duration': `${item.duration}s`,
              '--photo-delay': `${item.delay}s`,
              '--photo-drift': `${item.drift}px`,
            }}
          >
            <img className="photo" src={item.photo} alt="memory" />
          </div>
        ))}

      </section>

    </main>
  )
}
