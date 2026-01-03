"use client";

import { useState } from "react";
import {
    Target,
    Users,
    Send,
    CheckSquare,
    MoreHorizontal,
    Shield,
    User,
    Plus,
    Clock,
    CheckCircle2,
    Circle,
    Bell
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/core/ui/button";
import { Input } from "@/components/core/ui/input";
import { Label } from "@/components/core/ui/label";
import { Badge } from "@/components/core/ui/badge";
import { ScrollArea } from "@/components/core/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/core/ui/avatar";
import { useMode } from "./ModeContext";

interface TodoItem {
    id: string;
    text: string;
    completed: boolean;
    type: 'admin' | 'personal';
}

interface WorkerSession {
    id: string;
    name: string;
    role: string;
    status: 'online' | 'busy' | 'offline';
    currentObjective: string;
    avatar?: string;
}

export function SessionModuleContent() {
    const { mode, isAdmin } = useMode();

    // Mock Data
    const [currentObjective, setCurrentObjective] = useState("Complete Q3 Inventory Audit");
    const [todos, setTodos] = useState<TodoItem[]>([
        { id: '1', text: 'Review Q3 Sales Report', completed: true, type: 'admin' },
        { id: '2', text: 'Update Stock Levels for Category A', completed: false, type: 'admin' },
        { id: '3', text: 'Call supplier regarding delay', completed: false, type: 'personal' },
    ]);
    const [workers, setWorkers] = useState<WorkerSession[]>([
        { id: '1', name: 'Sarah Connor', role: 'Sales Agent', status: 'online', currentObjective: 'Handling customer tickets' },
        { id: '2', name: 'John Doe', role: 'Product Researcher', status: 'busy', currentObjective: 'Competitor analysis' },
        { id: '3', name: 'Mike Ross', role: 'Stock Manager', status: 'offline', currentObjective: '-' },
    ]);
    const [broadcastMsg, setBroadcastMsg] = useState("");
    const [newTodo, setNewTodo] = useState("");

    const handleToggleTodo = (id: string) => {
        setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const handleAddTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTodo.trim()) return;
        setTodos([...todos, { id: Date.now().toString(), text: newTodo, completed: false, type: 'personal' }]);
        setNewTodo("");
    };

    const handleBroadcast = (e: React.FormEvent) => {
        e.preventDefault();
        if (!broadcastMsg.trim()) return;
        // Mock broadcast
        alert(`Broadcast sent to ${workers.filter(w => w.status !== 'offline').length} active sessions: "${broadcastMsg}"`);
        setBroadcastMsg("");
    };

    return (
        <div className="flex flex-col h-full bg-transparent">
            {isAdmin ? (
                // ADMIN VIEW
                <div className="flex flex-col h-full">
                    {/* Active Sessions List */}
                    <div className="p-4 border-b border-border bg-card/50 rounded-lg mb-4">
                        <h4 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider flex items-center gap-2">
                            <Users className="w-3.5 h-3.5" />
                            Active Team Sessions ({workers.filter(w => w.status === 'online' || w.status === 'busy').length})
                        </h4>
                        <div className="space-y-3">
                            {workers.map(worker => (
                                <div key={worker.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors group relative border border-transparent hover:border-border/50">
                                    <Avatar className="w-8 h-8">
                                        <AvatarFallback className="text-xs bg-primary/10 text-primary">{worker.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium truncate">{worker.name}</span>
                                            <Badge variant="outline" className={cn(
                                                "text-[10px] px-1.5 py-0 h-4",
                                                worker.status === 'online' ? "bg-green-500/10 text-green-500 border-green-500/20" :
                                                    worker.status === 'busy' ? "bg-orange-500/10 text-orange-500 border-orange-500/20" :
                                                        "bg-slate-500/10 text-slate-500 border-slate-500/20"
                                            )}>
                                                {worker.status}
                                            </Badge>
                                        </div>
                                        <div className="text-xs text-muted-foreground truncate mt-0.5">
                                            {worker.currentObjective}
                                        </div>
                                        {/* Admin Quick Actions */}
                                        <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="text-[10px] text-primary hover:underline">Set Objective</button>
                                            <span className="text-border">|</span>
                                            <button className="text-[10px] text-primary hover:underline">Send Msg</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Broadcast Section */}
                    <div className="mt-auto p-4 bg-muted/20 border-t border-border rounded-lg">
                        <form onSubmit={handleBroadcast} className="flex flex-col gap-2">
                            <Label className="text-xs font-semibold flex items-center gap-1.5">
                                <Send className="w-3.5 h-3.5" />
                                Broadcast Message / Objective
                            </Label>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Type a message to all active agents..."
                                    value={broadcastMsg}
                                    onChange={e => setBroadcastMsg(e.target.value)}
                                    className="h-8 text-xs bg-background"
                                />
                                <Button size="sm" type="submit" className="h-8 px-3">Send</Button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                // STANDARD/TEAM VIEW
                <div className="flex flex-col h-full">
                    {/* Current Objective */}
                    <div className="p-5 bg-gradient-to-br from-primary/5 to-transparent border border-border rounded-xl mb-4">
                        <h4 className="text-xs font-semibold text-primary mb-1 uppercase tracking-wider flex items-center gap-2">
                            <Target className="w-3.5 h-3.5" />
                            Current Session Objective
                        </h4>
                        <div className="text-lg font-medium leading-tight">
                            {currentObjective}
                        </div>
                        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Assigned by Admin (2h ago)</span>
                        </div>
                    </div>

                    {/* TODOs */}
                    <div className="flex-1 overflow-hidden flex flex-col border border-border rounded-xl bg-card">
                        <div className="p-3 px-4 border-b border-border bg-muted/30 flex items-center justify-between">
                            <h4 className="text-xs font-semibold flex items-center gap-2">
                                <CheckSquare className="w-3.5 h-3.5" />
                                Tasks & TODOs
                            </h4>
                            <Badge variant="secondary" className="text-[10px] h-5">
                                {todos.filter(t => t.completed).length}/{todos.length}
                            </Badge>
                        </div>

                        <ScrollArea className="flex-1 p-2">
                            <div className="space-y-1">
                                {todos.map(todo => (
                                    <div
                                        key={todo.id}
                                        className={cn(
                                            "group flex items-start gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer",
                                            todo.completed && "opacity-60"
                                        )}
                                        onClick={() => handleToggleTodo(todo.id)}
                                    >
                                        <button className={cn(
                                            "mt-0.5 shrink-0 transition-colors",
                                            todo.completed ? "text-green-500" : "text-muted-foreground group-hover:text-primary"
                                        )}>
                                            {todo.completed ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                                        </button>
                                        <div className="flex-1 min-w-0">
                                            <p className={cn(
                                                "text-sm leading-snug transition-all",
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

                        {/* Add TODO Input */}
                        <div className="p-3 border-t border-border">
                            <form onSubmit={handleAddTodo} className="flex gap-2">
                                <Input
                                    placeholder="Add a personal task..."
                                    value={newTodo}
                                    onChange={e => setNewTodo(e.target.value)}
                                    className="h-8 text-xs bg-transparent border-0 ring-0 focus-visible:ring-0 px-0 shadow-none placeholder:text-muted-foreground/70"
                                />
                                <Button size="sm" variant="ghost" type="submit" className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary rounded-full">
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
