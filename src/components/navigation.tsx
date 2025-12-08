'use client';
import { signOut, useSession } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import { GithubLoginButton } from './login/githubLoginButton';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react';

export const Navigation = () => {
	const { data: session } = useSession();
	const [isOpen, setIsOpen] = useState(false);
	const user = session?.user;
	const pathname = usePathname();

	const linkClass = (href: string) =>
		`rounded-xl px-4 py-2 hover:bg-gray-300 ${
			pathname === href
				? 'underline underline-offset-8 decoration-gray-400'
				: ''
		}`;

	return (
		<header className="sticky top-0 flex items-center justify-between bg-gray-100 p-2 px-8">
			<Link href="/" className="rounded-xl hover:bg-gray-300">
				<Image src="/icon.png" alt="Logo" width={50} height={50}></Image>
			</Link>
			<nav className="hidden gap-4 font-medium lg:flex">
				<Link href="/events" className={linkClass('/events')}>
					Events
				</Link>
				<Link href="/venues" className={linkClass('/venues')}>
					Venues
				</Link>
				<Link href="/board" className={linkClass('/board')}>
					Board
				</Link>
				<Link href="/ownedEvents" className={linkClass('/ownedEvents')}>
					Owned events
				</Link>
			</nav>

			{isOpen && (
				<div className="absolute top-full left-0 w-full border-t bg-gray-100 lg:hidden">
					<nav className="flex flex-col items-center gap-2 p-4 font-medium">
						<Link
							href="/events"
							className={linkClass('/events')}
							onClick={() => {
								setIsOpen(!isOpen);
							}}
						>
							Events
						</Link>
						<Link
							href="/venues"
							className={linkClass('/venues')}
							onClick={() => {
								setIsOpen(!isOpen);
							}}
						>
							Venues
						</Link>
						<Link
							href="/board"
							className={linkClass('/board')}
							onClick={() => {
								setIsOpen(!isOpen);
							}}
						>
							Board
						</Link>
						<Link
							href="/ownedEvents"
							className={linkClass('/ownedEvents')}
							onClick={() => {
								setIsOpen(!isOpen);
							}}
						>
							Owned events
						</Link>
					</nav>
				</div>
			)}

			<div className="flex items-center gap-4">
				<div className="flex flex-col gap-1 rounded-xl p-2 hover:bg-gray-300 lg:hidden">
					<Menu
						onClick={() => {
							setIsOpen(!isOpen);
						}}
					/>
				</div>
				{user && (
					<Link href="/user" className="rounded-xl p-2 hover:bg-gray-300">
						<Image
							src={user.image || '/user.png'}
							alt={user.name}
							width={30}
							height={30}
						></Image>
					</Link>
				)}
				{!user && <GithubLoginButton></GithubLoginButton>}
				{user && (
					<div className="flex items-center">
						<div className="mx-2 h-8 border-l border-gray-400 pl-3"></div>
						<div className="rounded-xl p-2 hover:bg-gray-300">
							<Image
								src={'/logout.png'}
								alt="logout"
								onClick={() => signOut()}
								width={30}
								height={30}
							></Image>
						</div>
					</div>
				)}
			</div>
		</header>
	);
};
