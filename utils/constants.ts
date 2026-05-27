export interface Team {
	id: string;
	name: string;
	score: number;
}

export interface Burst {
	id: number;
	teamName: string;
	teamColor: string;
	points: number;
}

export const CONFETTI_COLORS = [
	"#ff4d4f",
	"#1890ff",
	"#52c41a",
	"#faad14",
	"#eb2f96",
	"#722ed1",
	"#13c2c2",
	"#fa8c16",
	"#ffd700",
	"#ff6b6b",
	"#51cf66",
	"#339af0",
	"#f06595",
	"#cc5de8",
	"#ff922b",
];

export const INITIAL_TEAMS: Team[] = [
	{ id: "1", name: "H4ck3rs_Un1t3d", score: 0 },
	{ id: "2", name: "Null_Byt3s", score: 0 },
	{ id: "3", name: "Sh3ll_Sh0ck3rs", score: 0 },
	{ id: "4", name: "R3v3rs3_Engin33rs", score: 0 },
	{ id: "5", name: "Pwn3rs", score: 0 },
	{ id: "6", name: "Crypt0_K1ddi3s", score: 0 },
	{ id: "7", name: "SQL_Inj3ct0rs", score: 0 },
	{ id: "8", name: "XSS_W1zards", score: 0 },
	{ id: "9", name: "B1nary_Expl01t3rs", score: 0 },
	{ id: "10", name: "D0S_Att4ck3rs", score: 0 },
];

export const SCORE_POINTS = [50, 100, 200, 500, 1000, 2000];

export const TEAM_COLORS: Record<string, string> = {
	"1": "#ff4d4f",
	"2": "#1890ff",
	"3": "#52c41a",
	"4": "#faad14",
	"5": "#eb2f96",
	"6": "#722ed1",
	"7": "#13c2c2",
	"8": "#fa8c16",
	"9": "#2f54eb",
	"10": "#a0d911",
};
