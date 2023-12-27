"use client";

export default function UserList({ user }: { user: any }) {
	return (
		<ul>
			{user.map((item: any, index: number) => (
				<li key={index}>
					{" "}
					sn :({index + 1}) {item.name}{" "}
				</li>
			))}
		</ul>
	);
}
