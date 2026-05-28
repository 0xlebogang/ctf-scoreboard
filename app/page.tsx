"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Typography } from "antd";
import { motion } from "framer-motion";
import {
	INITIAL_TEAMS,
	TEAM_COLORS,
	SCORE_POINTS,
	type Team,
	type Burst,
} from "@/utils/constants";
import Confetti from "@/components/Confetti";
import ScoreAnnouncement, {
	ScoreFlash,
} from "@/components/ScoreAnnouncement";
import ScoreboardHeader from "@/components/ScoreboardHeader";
import LeaderboardRow from "@/components/LeaderboardRow";

const { Title, Text } = Typography;

export default function Home() {
	const [teams, setTeams] = useState<Team[]>(INITIAL_TEAMS);
	const [scoringTeamId, setScoringTeamId] = useState<string | null>(null);
	const [lastPoints, setLastPoints] = useState(0);
	const [lastEvent, setLastEvent] = useState<{
		name: string;
		points: number;
	} | null>(null);
	const [mounted, setMounted] = useState(false);
	const [prevOrder, setPrevOrder] = useState<string[]>([]);
	const [burst, setBurst] = useState<Burst | null>(null);
	const burstIdRef = useRef(0);

	useEffect(() => {
		setMounted(true);
		const saved = localStorage.getItem("ctf-scores");
		if (saved) {
			try {
				setTeams(JSON.parse(saved));
			} catch {
				/* ignore */
			}
		}
	}, []);

	useEffect(() => {
		if (mounted) {
			localStorage.setItem("ctf-scores", JSON.stringify(teams));
		}
	}, [teams, mounted]);

	const addScore = useCallback(() => {
		setTeams((prev) => {
			const idx = Math.floor(Math.random() * prev.length);
			const points =
				SCORE_POINTS[Math.floor(Math.random() * SCORE_POINTS.length)];
			const next = prev.map((t) => ({ ...t }));
			next[idx] = { ...next[idx], score: next[idx].score + points };

			const teamId = next[idx].id;
			const teamColor = TEAM_COLORS[teamId];

			setScoringTeamId(teamId);
			setLastPoints(points);
			setLastEvent({ name: next[idx].name, points });

			burstIdRef.current += 1;
			setBurst({
				id: burstIdRef.current,
				teamName: next[idx].name,
				teamColor,
				points,
			});

			setTimeout(() => {
				setScoringTeamId(null);
				setLastEvent(null);
				setBurst(null);
			}, 2500);

			return next;
		});
	}, []);

	useEffect(() => {
		if (!mounted) return;
		const delay = 3000 + Math.random() * 5000;
		const timer = setTimeout(addScore, delay);
		return () => clearTimeout(timer);
	}, [addScore, mounted]);

	const reset = () => {
		setTeams(INITIAL_TEAMS.map((t) => ({ ...t, score: 0 })));
		setLastEvent(null);
		setScoringTeamId(null);
		setPrevOrder([]);
		setBurst(null);
		burstIdRef.current = 0;
		localStorage.removeItem("ctf-scores");
	};

	const sorted = [...teams].sort((a, b) => b.score - a.score);
	const sortedIds = sorted.map((t) => t.id);

	useEffect(() => {
		if (mounted) {
			setPrevOrder(sortedIds);
		}
	}, [teams, mounted]);

	const rankChanges = new Map<string, "up" | "down" | "same">();
	if (prevOrder.length > 0) {
		for (const team of sorted) {
			const prevIdx = prevOrder.indexOf(team.id);
			const currIdx = sortedIds.indexOf(team.id);
			if (prevIdx > currIdx) rankChanges.set(team.id, "up");
			else if (prevIdx < currIdx) rankChanges.set(team.id, "down");
			else rankChanges.set(team.id, "same");
		}
	}

	const topScore = sorted[0]?.score || 1;

	return (
		<>
			<Confetti burst={burst} />
			<ScoreFlash burst={burst} />
			<ScoreAnnouncement burst={burst} />

			<div
				style={{
					minHeight: "100vh",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: "10rem",
					padding: "2rem 1rem",
					position: "relative",
				}}
			>
				<div style={{ width: "100%", maxWidth: 560 }}>
					<ScoreboardHeader
						category="Blue"
						lastEvent={lastEvent}
					/>

					{sorted.map((team, index) => (
						<LeaderboardRow
							key={team.id}
							team={team}
							index={index}
							isScoring={scoringTeamId === team.id}
							lastPoints={lastPoints}
							rankChange={rankChanges.get(team.id)}
							topScore={topScore}
							teamColor={TEAM_COLORS[team.id]}
						/>
					))}

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5 }}
						style={{
							textAlign: "center",
							marginTop: 32,
							padding: "16px 0",
							borderTop: "1px solid rgba(255,255,255,0.06)",
						}}
					>
						<Text
							style={{
								color: "rgba(255,255,255,0.3)",
								fontFamily: "monospace",
								fontSize: 12,
							}}
						>
							Total flags captured:{" "}
							{teams
								.reduce((s, t) => s + t.score, 0)
								.toLocaleString()}{" "}
							pts | Leading:{" "}
							<span style={{ color: TEAM_COLORS[sorted[0]?.id] }}>
								{sorted[0]?.name}
							</span>
						</Text>
					</motion.div>
				</div>

				<div style={{ width: "100%", maxWidth: 560 }}>
					<ScoreboardHeader category="Red" lastEvent={lastEvent} onReset={reset} />

					{sorted.map((team, index) => (
						<LeaderboardRow
							key={team.id}
							team={team}
							index={index}
							isScoring={scoringTeamId === team.id}
							lastPoints={lastPoints}
							rankChange={rankChanges.get(team.id)}
							topScore={topScore}
							teamColor={TEAM_COLORS[team.id]}
						/>
					))}

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5 }}
						style={{
							textAlign: "center",
							marginTop: 32,
							padding: "16px 0",
							borderTop: "1px solid rgba(255,255,255,0.06)",
						}}
					>
						<Text
							style={{
								color: "rgba(255,255,255,0.3)",
								fontFamily: "monospace",
								fontSize: 12,
							}}
						>
							Total flags captured:{" "}
							{teams
								.reduce((s, t) => s + t.score, 0)
								.toLocaleString()}{" "}
							pts | Leading:{" "}
							<span style={{ color: TEAM_COLORS[sorted[0]?.id] }}>
								{sorted[0]?.name}
							</span>
						</Text>
					</motion.div>
				</div>
			</div>
		</>
	);
}
