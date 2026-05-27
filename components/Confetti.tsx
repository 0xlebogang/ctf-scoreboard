"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { CONFETTI_COLORS, type Burst } from "@/utils/constants";

interface Particle {
	id: number;
	x: number;
	y: number;
	rotation: number;
	color: string;
	size: number;
	isCircle: boolean;
	delay: number;
}

function generateParticles(count: number): Particle[] {
	return Array.from({ length: count }, (_, i) => ({
		id: i,
		x: (Math.random() - 0.5) * 1200,
		y: -(200 + Math.random() * 600),
		rotation: (Math.random() - 0.5) * 1440,
		color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
		size: 4 + Math.random() * 12,
		isCircle: Math.random() > 0.45,
		delay: Math.random() * 0.25,
	}));
}

export default function Confetti({ burst }: { burst: Burst | null }) {
	const particles = useMemo(
		() => (burst ? generateParticles(80) : []),
		[burst?.id],
	);

	if (!burst || particles.length === 0) return null;

	return (
		<div
			style={{
				position: "fixed",
				inset: 0,
				pointerEvents: "none",
				zIndex: 9999,
				overflow: "hidden",
			}}
		>
			{particles.map((p) => (
				<motion.div
					key={p.id}
					initial={{
						x: "50vw",
						y: "70vh",
						opacity: 1,
						rotate: 0,
						scale: 0,
					}}
					animate={{
						x: `calc(50vw + ${p.x}px)`,
						y: `calc(70vh + ${p.y}px)`,
						opacity: [1, 1, 0],
						rotate: p.rotation,
						scale: [0, 1, 0.8, 0.5],
					}}
					transition={{
						duration: 1.8,
						delay: p.delay,
						ease: [0.25, 0.1, 0.25, 1],
						opacity: {
							duration: 1.8,
							delay: p.delay,
							times: [0, 0.7, 1],
						},
						scale: {
							duration: 1.8,
							delay: p.delay,
							times: [0, 0.15, 0.5, 1],
						},
					}}
					style={{
						position: "absolute",
						width: p.isCircle ? p.size : p.size * 0.5,
						height: p.size,
						borderRadius: p.isCircle ? "50%" : 2,
						backgroundColor: p.color,
					}}
				/>
			))}
		</div>
	);
}
