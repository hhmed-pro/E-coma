"use client";

import { useState } from "react";
import {
    Target,
    Users,
    Send,
    CheckSquare,
    Shield,
    Plus,
    Clock,
    CheckCircle2,
    Circle,
    MessageSquare,
    LayoutGrid
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/core/ui/button";
import { Input } from "@/components/core/ui/input";
import { Label } from "@/components/core/ui/label";
import { Badge } from "@/components/core/ui/badge";
import { ScrollArea } from "@/components/core/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/core/ui/avatar";
import { useMode } from "./ModeContext";
import { TEAMS } from "@/config/teams";

// Tab types for each mode
type AdminTab = "teams" | "todos" | "chat";
type TeamTab = "session" | "todos" | "chat";

export function SessionModuleContent() {
    const {
        mode,
        isAdmin,
        activeTeam,
        activeTeams,
        teamObjectives,
        adminTodos,
        teamTodos,
        addTodo,
        toggleTodo,
        adminChats,
        teamChats,
        sendMessage
    } = useMode();

    // Tab state
    const [adminTab, setAdminTab] = useState<AdminTab>("teams");
    const [teamTab, setTeamTab] = useState<TeamTab>("session");

    // Form state
    const [newTodo, setNewTodo] = useState("");
    const [chatMessage, setChatMessage] = useState("");
    const [broadcastMsg, setBroadcastMsg] = useState("");

    // Mock workers for display
    const workers = [
        { id: '1', name: 'Sarah Connor', role: 'Confirmation', teamId: 'confirmation', status: 'online' as const },
        { id: '2', name: 'John Doe', role: 'Sourcing', teamId: 'sourcing', status: 'busy' as const },
        { id: '3', name: 'Mike Ross', role: 'Stock', teamId: 'stock', status: 'offline' as const },
    ];

    const handleAddTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTodo.trim()) return;
        addTodo(newTodo, isAdmin ? 'admin' : 'team');
        setNewTodo("");
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatMessage.trim()) return;
        sendMessage(chatMessage, isAdmin ? 'admin' : 'team');
        setChatMessage("");
    };

    const handleBroadcast = (e: React.FormEvent) => {
        e.preventDefault();
        if (!broadcastMsg.trim()) return;
        sendMessage(broadcastMsg, 'admin');
        setBroadcastMsg("");
    };

    // Get current team's objective
    const currentObjective = activeTeam ? teamObjectives[activeTeam.id] : "No objective set";

    return (
        <div className="flex flex-col h-full bg-transparent">
            {isAdmin ? (
                // ============ ADMIN VIEW ============
                <div className="flex flex-col h-full">
                    {/* Tab Navigation */}
                    <div className="flex gap-1 p-1 bg-muted/30 rounded-lg mb-4">
                        <button
                            onClick={() => setAdminTab("teams")}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-all",
                                adminTab === "teams"
                                    ? "bg-background text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <LayoutGrid className="w-3.5 h-3.5" />
                            Teams Overview
                        </button>
                        <button
                            onClick={() => setAdminTab("todos")}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-all",
                                adminTab === "todos"
                                    ? "bg-background text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <CheckSquare className="w-3.5 h-3.5" />
                            Admin Todos
                            {adminTodos.filter(t => !t.completed).length > 0 && (
                                <Badge variant="secondary" className="text-[9px] h-4 px-1">
                                    {adminTodos.filter(t => !t.completed).length}
                                </Badge>
                            )}
                        </button>
                        <button
                            onClick={() => setAdminTab("chat")}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-all",
                                adminTab === "chat"
                                    ? "bg-background text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <MessageSquare className="w-3.5 h-3.5" />
                            Communications
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="flex-1 overflow-hidden">
                        {adminTab === "teams" && (
                            <div className="h-full flex flex-col">
                                <div className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider flex items-center gap-2">
                                    <Users className="w-3.5 h-3.5" />
                                    Active Teams ({activeTeams.length})
                                </div>
                                <ScrollArea className="flex-1">
                                    <div className="space-y-3 pr-2">
                                        {activeTeams.map(team => {
                                            const Icon = team.icon;
                                            const teamWorkers = workers.filter(w => w.teamId === team.id);
                                            return (
                                                <div key={team.id} className="p-3 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center bg-muted")}>
                                                            <Icon className={cn("w-4 h-4", team.color)} />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="font-medium text-sm">{team.name}</div>
                                                            <div className="text-[10px] text-muted-foreground truncate">
                                                                {teamObjectives[team.id] || "No objective set"}
                                                            </div>
                                                        </div>
                                                        <Badge variant="outline" className="text-[9px] bg-green-500/10 text-green-500 border-green-500/20">
                                                            Active
                                                        </Badge>
                                                    </div>
                                                    {teamWorkers.length > 0 && (
                                                        <div className="flex items-center gap-1 mt-2 pt-2 border-t border-border/50">
                                                            {teamWorkers.map(w => (
                                                                <Avatar key={w.id} className="w-5 h-5">
                                                                    <AvatarFallback className="text-[8px] bg-primary/10 text-primary">
                                                                        {w.name.charAt(0)}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                            ))}
                                                            <span className="text-[10px] text-muted-foreground ml-1">
                                                                {teamWorkers.length} member{teamWorkers.length > 1 ? 's' : ''}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </ScrollArea>
                            </div>
                        )}

                        {adminTab === "todos" && (
                            <div className="h-full flex flex-col border border-border rounded-xl bg-card overflow-hidden">
                                <div className="p-3 px-4 border-b border-border bg-muted/30 flex items-center justify-between">
                                    <h4 className="text-xs font-semibold flex items-center gap-2">
                                        <CheckSquare className="w-3.5 h-3.5" />
                                        Admin Tasks
                                    </h4>
                                    <Badge variant="secondary" className="text-[10px] h-5">
                                        {adminTodos.filter(t => t.completed).length}/{adminTodos.length}
                                    </Badge>
                                </div>
                                <ScrollArea className="flex-1 p-2">
                                    <div className="space-y-1">
                                        {adminTodos.map(todo => (
                                            <div
                                                key={todo.id}
                                                className={cn(
                                                    "group flex items-start gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer",
                                                    todo.completed && "opacity-60"
                                                )}
                                                onClick={() => toggleTodo(todo.id)}
                                            >
                                                <button className={cn(
                                                    "mt-0.5 shrink-0 transition-colors",
                                                    todo.completed ? "text-green-500" : "text-muted-foreground group-hover:text-primary"
                                                )}>
                                                    {todo.completed ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                                                </button>
                                                <p className={cn(
                                                    "text-sm leading-snug",
                                                    todo.completed && "line-through text-muted-foreground"
                                                )}>
                                                    {todo.text}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                                <div className="p-3 border-t border-border">
                                    <form onSubmit={handleAddTodo} className="flex gap-2">
                                        <Input
                                            placeholder="Add admin task..."
                                            value={newTodo}
                                            onChange={e => setNewTodo(e.target.value)}
                                            className="h-8 text-xs"
                                        />
                                        <Button size="sm" type="submit" className="h-8 px-3">
                                            <Plus className="w-3.5 h-3.5" />
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        )}

                        {adminTab === "chat" && (
                            <div className="h-full flex flex-col border border-border rounded-xl bg-card overflow-hidden">
                                <div className="p-3 px-4 border-b border-border bg-muted/30">
                                    <h4 className="text-xs font-semibold flex items-center gap-2">
                                        <MessageSquare className="w-3.5 h-3.5" />
                                        Broadcast to All Teams
                                    </h4>
                                </div>
                                <ScrollArea className="flex-1 p-3">
                                    <div className="space-y-3">
                                        {adminChats.map(chat => (
                                            <div key={chat.id} className="flex gap-2">
                                                <Avatar className="w-6 h-6 shrink-0">
                                                    <AvatarFallback className="text-[9px] bg-primary/10 text-primary">
                                                        {chat.senderName.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-medium">{chat.senderName}</span>
                                                        <span className="text-[10px] text-muted-foreground">
                                                            {chat.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">{chat.message}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                                <div className="p-3 border-t border-border">
                                    <form onSubmit={handleBroadcast} className="flex gap-2">
                                        <Input
                                            placeholder="Broadcast message to all teams..."
                                            value={broadcastMsg}
                                            onChange={e => setBroadcastMsg(e.target.value)}
                                            className="h-8 text-xs"
                                        />
                                        <Button size="sm" type="submit" className="h-8 px-3">
                                            <Send className="w-3.5 h-3.5" />
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                // ============ TEAM VIEW ============
                <div className="flex flex-col h-full">
                    {/* Tab Navigation */}
                    <div className="flex gap-1 p-1 bg-muted/30 rounded-lg mb-4">
                        <button
                            onClick={() => setTeamTab("session")}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-all",
                                teamTab === "session"
                                    ? "bg-background text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <Target className="w-3.5 h-3.5" />
                            Session
                        </button>
                        <button
                            onClick={() => setTeamTab("todos")}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-all",
                                teamTab === "todos"
                                    ? "bg-background text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <CheckSquare className="w-3.5 h-3.5" />
                            Team Todos
                            {teamTodos.filter(t => !t.completed).length > 0 && (
                                <Badge variant="secondary" className="text-[9px] h-4 px-1">
                                    {teamTodos.filter(t => !t.completed).length}
                                </Badge>
                            )}
                        </button>
                        <button
                            onClick={() => setTeamTab("chat")}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-all",
                                teamTab === "chat"
                                    ? "bg-background text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <MessageSquare className="w-3.5 h-3.5" />
                            Team Chat
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="flex-1 overflow-hidden">
                        {teamTab === "session" && activeTeam && (
                            <div className="h-full flex flex-col">
                                {/* Team Identity */}
                                <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
                                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center bg-background border border-border")}>
                                        <activeTeam.icon className={cn("w-5 h-5", activeTeam.color)} />
                                    </div>
                                    <div>
                                        <div className="font-semibold">{activeTeam.name}</div>
                                        <div className="text-xs text-muted-foreground">{activeTeam.allowedPage}</div>
                                    </div>
                                </div>

                                {/* Current Objective */}
                                <div className="p-4 bg-card border border-border rounded-xl">
                                    <h4 className="text-xs font-semibold text-primary mb-2 uppercase tracking-wider flex items-center gap-2">
                                        <Target className="w-3.5 h-3.5" />
                                        Current Session Objective
                                    </h4>
                                    <div className="text-lg font-medium leading-tight">
                                        {currentObjective}
                                    </div>
                                    <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span>Assigned by Admin</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {teamTab === "todos" && (
                            <div className="h-full flex flex-col border border-border rounded-xl bg-card overflow-hidden">
                                <div className="p-3 px-4 border-b border-border bg-muted/30 flex items-center justify-between">
                                    <h4 className="text-xs font-semibold flex items-center gap-2">
                                        <CheckSquare className="w-3.5 h-3.5" />
                                        Tasks & TODOs
                                    </h4>
                                    <Badge variant="secondary" className="text-[10px] h-5">
                                        {teamTodos.filter(t => t.completed).length}/{teamTodos.length}
                                    </Badge>
                                </div>
                                <ScrollArea className="flex-1 p-2">
                                    <div className="space-y-1">
                                        {teamTodos.map(todo => (
                                            <div
                                                key={todo.id}
                                                className={cn(
                                                    "group flex items-start gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer",
                                                    todo.completed && "opacity-60"
                                                )}
                                                onClick={() => toggleTodo(todo.id)}
                                            >
                                                <button className={cn(
                                                    "mt-0.5 shrink-0 transition-colors",
                                                    todo.completed ? "text-green-500" : "text-muted-foreground group-hover:text-primary"
                                                )}>
                                                    {todo.completed ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                                                </button>
                                                <div className="flex-1 min-w-0">
                                                    <p className={cn(
                                                        "text-sm leading-snug",
                                                        todo.completed && "line-through text-muted-foreground"
                                                    )}>
                                                        {todo.text}
                                                    </p>
                                                    {todo.type === 'admin' && (
                                                        <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-medium text-orange-500 bg-orange-500/10 px-1.5 py-0.5 rounded">
                                                            <Shield className="w-2.5 h-2.5" />
                                                            Admin Assigned
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                                <div className="p-3 border-t border-border">
                                    <form onSubmit={handleAddTodo} className="flex gap-2">
                                        <Input
                                            placeholder="Add a personal task..."
                                            value={newTodo}
                                            onChange={e => setNewTodo(e.target.value)}
                                            className="h-8 text-xs"
                                        />
                                        <Button size="sm" variant="ghost" type="submit" className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary rounded-full">
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        )}

                        {teamTab === "chat" && (
                            <div className="h-full flex flex-col border border-border rounded-xl bg-card overflow-hidden">
                                <div className="p-3 px-4 border-b border-border bg-muted/30">
                                    <h4 className="text-xs font-semibold flex items-center gap-2">
                                        <MessageSquare className="w-3.5 h-3.5" />
                                        {activeTeam?.name || "Team"} Chat
                                    </h4>
                                </div>
                                <ScrollArea className="flex-1 p-3">
                                    <div className="space-y-3">
                                        {teamChats.map(chat => (
                                            <div key={chat.id} className="flex gap-2">
                                                <Avatar className="w-6 h-6 shrink-0">
                                                    <AvatarFallback className="text-[9px] bg-primary/10 text-primary">
                                                        {chat.senderName.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-medium">{chat.senderName}</span>
                                                        <span className="text-[10px] text-muted-foreground">
                                                            {chat.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">{chat.message}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                                <div className="p-3 border-t border-border">
                                    <form onSubmit={handleSendMessage} className="flex gap-2">
                                        <Input
                                            placeholder="Type a message..."
                                            value={chatMessage}
                                            onChange={e => setChatMessage(e.target.value)}
                                            className="h-8 text-xs"
                                        />
                                        <Button size="sm" type="submit" className="h-8 px-3">
                                            <Send className="w-3.5 h-3.5" />
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
