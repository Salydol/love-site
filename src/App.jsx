import { useMemo } from 'react'
import { motion } from 'framer-motion'

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
  const textRain = useMemo(
    () =>
      Array.from({ length: 95 }, (_, i) => ({
        id: i,
        left: 1 + ((i * 9.3) % 98),
        scale: 0.5 + (i % 7) * 0.13,
        duration: 7.5 + (i % 7) * 1.05,
        delay: (i % 15) * 0.33,
        opacity: 0.28 + (i % 6) * 0.11,
        text: i % 16 === 0 ? `${messages[(i + 1) % messages.length]} ❤️` : 'I love you❤️',
      })),
    [],
  )

  const photoRain = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        left: 6 + ((i * 12.7) % 86),
        scale: 0.72 + (i % 5) * 0.16,
        duration: 17 + (i % 4) * 1.9,
        delay: (i % 8) * 1.15,
        sway: (i % 2 === 0 ? 1 : -1) * (6 + (i % 3) * 3),
        photo: photos[i % photos.length],
      })),
    [],
  )

  const stars = useMemo(
    () =>
      Array.from({ length: 150 }, (_, i) => ({
        id: i,
        width: (i % 3) + 1,
        left: (i * 7) % 100,
        top: (i * 11) % 100,
        opacity: 0.2 + (i % 5) * 0.12,
      })),
    [],
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
          <motion.div
            key={item.id}
            className="rain-text"
            style={{
              left: `${item.left}%`,
              top: '-16vh',
              scale: item.scale,
            }}
            initial={{ y: '-18vh', opacity: 0 }}
            animate={{ y: '124vh', opacity: [0, item.opacity, item.opacity, 0] }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: 'linear',
            }}
          >
            {item.text}
          </motion.div>
        ))}

        {photoRain.map((item) => (
          <motion.div
            key={item.id}
            className="rain-photo"
            style={{
              left: `${item.left}%`,
              top: '-24vh',
              scale: item.scale,
            }}
            initial={{ y: '-30vh', x: 0, opacity: 0 }}
            animate={{ y: '126vh', x: [0, item.sway, -item.sway * 0.55, 0], opacity: [0, 0.92, 0.92, 0] }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: 'easeInOut',
            }}
          >
            <img className="photo" src={item.photo} alt="memory" />
          </motion.div>
        ))}

      </section>

    </main>
  )
}
