"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/core/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/core/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/core/ui/avatar";
import { Badge } from "@/components/core/ui/badge";
import { Trophy, Medal } from "lucide-react";

export interface LeaderboardUser {
    id: string;
    name: string;
    initials: string;
    avatar?: string;
    conversations: number;
    avgResponseTime: string;
    resolutions: number;
    score: number;
}

export function LeaderboardTable({ users }: { users: LeaderboardUser[] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">Rang</TableHead>
                            <TableHead>Agent</TableHead>
                            <TableHead className="text-right">Conversations</TableHead>
                            <TableHead className="text-right">Temps Réponse</TableHead>
                            <TableHead className="text-right">Résolutions</TableHead>
                            <TableHead className="text-right">Score</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user, i) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    {i === 0 && <Trophy className="h-4 w-4 text-yellow-500" />}
                                    {i === 1 && <Medal className="h-4 w-4 text-gray-400" />}
                                    {i === 2 && <Medal className="h-4 w-4 text-amber-600" />}
                                    {i > 2 && <span className="text-muted-foreground font-medium pl-1">{i + 1}</span>}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={user.avatar} />
                                            <AvatarFallback>{user.initials}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium">{user.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right font-medium">{user.conversations}</TableCell>
                                <TableCell className="text-right text-muted-foreground">{user.avgResponseTime}</TableCell>
                                <TableCell className="text-right">{user.resolutions}</TableCell>
                                <TableCell className="text-right">
                                    <Badge variant={user.score >= 90 ? 'default' : user.score >= 70 ? 'secondary' : 'outline'} className={user.score >= 90 ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 hover:bg-green-100" : ""}>
                                        {user.score}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
