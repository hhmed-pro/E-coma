"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/core/ui/card";
import { Button } from "@/components/core/ui/button";
import { Calendar, Clock, Facebook, Instagram, Video, Image as ImageIcon, Plus } from "lucide-react";
import Image from "next/image";

// Mock Data
const scheduledPosts = [
    {
        id: 1,
        title: "Promo Aid El Adha",
        platform: "tiktok",
        date: "2024-06-15",
        time: "18:00",
        status: "scheduled",
        thumbnail: "https://placehold.co/400x600/png?text=Promo+Aid",
    },
    {
        id: 2,
        title: "Livraison 58 Wilayas",
        platform: "facebook",
        date: "2024-06-15",
        time: "20:00",
        status: "scheduled",
        thumbnail: "https://placehold.co/400x400/png?text=Livraison+Gratuite",
    },
    {
        id: 3,
        title: "Avis Client (Oran)",
        platform: "instagram",
        date: "2024-06-16",
        time: "12:00",
        status: "draft",
        thumbnail: "https://placehold.co/400x400/png?text=Avis+Client",
    },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const dates = [10, 11, 12, 13, 14, 15, 16]; // Mock week

export default function SchedulerPage() {
    const [posts, setPosts] = useState(scheduledPosts);
    const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
    const [activeTab, setActiveTab] = useState<'queue' | 'drafts' | 'sent' | 'approvals'>('queue');

    // Filter posts based on active tab
    const filteredPosts = posts.filter(post => {
        if (activeTab === 'queue') return post.status === 'scheduled';
        if (activeTab === 'drafts') return post.status === 'draft';
        if (activeTab === 'sent') return post.status === 'sent';
        return true;
    });

    return (
        <div className="space-y-8 p-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-glow">Social Scheduler</h1>
                    <p className="text-muted-foreground">Plan and automate your organic content.</p>
                </div>
                <Button className="box-glow bg-primary text-primary-foreground">
                    <Plus className="mr-2 h-4 w-4" /> New Post
                </Button>
            </div>

            {/* Tabs & View Toggle */}
            <div className="flex items-center justify-between border-b pb-4">
                <div className="flex space-x-4">
                    {(['queue', 'drafts', 'approvals', 'sent'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`text-sm font-medium pb-4 -mb-4 border-b-2 transition-colors capitalize ${activeTab === tab
                                ? 'border-primary text-primary'
                                : 'border-transparent text-muted-foreground hover:text-gray-900 dark:hover:text-foreground'
                                }`}
                        >
                            {tab}
                            <span className="ml-2 bg-gray-100 dark:bg-muted text-gray-600 dark:text-muted-foreground px-2 py-0.5 rounded-full text-xs">
                                {posts.filter(p =>
                                    tab === 'queue' ? p.status === 'scheduled' :
                                        tab === 'drafts' ? p.status === 'draft' :
                                            tab === 'sent' ? p.status === 'sent' : false
                                ).length}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="flex bg-gray-100 dark:bg-muted p-1 rounded-lg">
                    <button
                        onClick={() => setViewMode('calendar')}
                        className={`p-2 rounded-md text-sm font-medium transition-all ${viewMode === 'calendar' ? 'bg-white dark:bg-card shadow-sm text-gray-900 dark:text-foreground' : 'text-gray-500 dark:text-muted-foreground hover:text-gray-900 dark:hover:text-foreground'}`}
                    >
                        <Calendar className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-md text-sm font-medium transition-all ${viewMode === 'list' ? 'bg-white dark:bg-card shadow-sm text-gray-900 dark:text-foreground' : 'text-gray-500 dark:text-muted-foreground hover:text-gray-900 dark:hover:text-foreground'}`}
                    >
                        <div className="w-4 h-4 flex flex-col justify-center gap-0.5">
                            <div className="w-full h-0.5 bg-current"></div>
                            <div className="w-full h-0.5 bg-current"></div>
                            <div className="w-full h-0.5 bg-current"></div>
                        </div>
                    </button>
                </div>
            </div>

            {/* Calendar View */}
            {viewMode === 'calendar' && (
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center">
                            <Calendar className="mr-2 h-5 w-5" /> June 2024
                        </CardTitle>
                        <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Week View</Button>
                            <Button variant="ghost" size="sm">Month View</Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-7 gap-4 text-center mb-4">
                            {days.map(day => (
                                <div key={day} className="font-semibold text-muted-foreground">{day}</div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-4 h-[600px]">
                            {dates.map((date, index) => {
                                const currentDate = `2024-06-${date}`;
                                const dayPosts = filteredPosts.filter(p => p.date === currentDate);
                                const isToday = date === 15; // Mock "Today"

                                return (
                                    <div key={date} className={`border rounded-lg p-2 relative ${isToday ? 'bg-primary/5 border-primary' : 'bg-muted/20'}`}>
                                        <div className={`text-right text-sm font-bold mb-2 ${isToday ? 'text-primary' : 'text-muted-foreground'}`}>
                                            {date}
                                        </div>

                                        <div className="space-y-2">
                                            {dayPosts.map(post => (
                                                <div key={post.id} className="bg-background border rounded p-2 text-left shadow-sm hover:border-primary cursor-pointer transition-colors group">
                                                    <div className="flex items-center justify-between mb-1">
                                                        {post.platform === 'tiktok' && <Video className="h-3 w-3 text-black dark:text-white" />}
                                                        {post.platform === 'facebook' && <Facebook className="h-3 w-3 text-blue-600" />}
                                                        {post.platform === 'instagram' && <Instagram className="h-3 w-3 text-pink-600" />}
                                                        <span className="text-[10px] text-muted-foreground flex items-center">
                                                            <Clock className="h-2 w-2 mr-1" /> {post.time}
                                                        </span>
                                                    </div>
                                                    <div className="text-xs font-medium truncate">{post.title}</div>
                                                    <div className="mt-1 h-1 w-full bg-muted rounded-full overflow-hidden">
                                                        <div className={`h-full ${post.status === 'scheduled' ? 'bg-green-500' : 'bg-yellow-500'} w-full`} />
                                                    </div>
                                                </div>
                                            ))}
                                            {/* Add Slot Placeholder */}
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-2 right-2">
                                                <Button size="icon" variant="ghost" className="h-6 w-6 rounded-full bg-primary/10 hover:bg-primary/20">
                                                    <Plus className="h-3 w-3 text-primary" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* List View */}
            {viewMode === 'list' && (
                <div className="space-y-4">
                    {filteredPosts.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 dark:bg-muted/20 rounded-xl border border-dashed border-gray-200 dark:border-border">
                            <p className="text-gray-500 dark:text-muted-foreground">No posts in this view.</p>
                            <Button variant="link" className="text-primary mt-2">Create a post</Button>
                        </div>
                    ) : (
                        filteredPosts.map((post) => (
                            <div key={post.id} className="bg-white dark:bg-card p-4 rounded-xl border border-gray-100 dark:border-border shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                                <div className="relative w-16 h-16 rounded-lg bg-gray-100 dark:bg-muted overflow-hidden flex-shrink-0">
                                    <Image src={post.thumbnail} alt={post.title} fill className="object-cover" unoptimized />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-medium text-gray-900 dark:text-foreground">{post.title}</h3>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full capitalize ${post.status === 'scheduled' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                                            }`}>
                                            {post.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            {post.platform === 'tiktok' && <Video className="h-3 w-3" />}
                                            {post.platform === 'facebook' && <Facebook className="h-3 w-3" />}
                                            {post.platform === 'instagram' && <Instagram className="h-3 w-3" />}
                                            <span className="capitalize">{post.platform}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            <span>{post.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            <span>{post.time}</span>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm">Edit</Button>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
