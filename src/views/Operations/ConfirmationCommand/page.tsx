"use client";

/**
 * ZONE 1: OPERATIONS - Confirmation Command Center
 * "Single Pane of Glass" design for order confirmation
 * 
 * Layout:
 * - LEFT: Orders Kanban (list of orders to process)
 * - CENTER: Risk Calculator + Order Details (active work area)
 * - RIGHT: Call Scripts + WhatsApp Bot (action tools)
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/core/ui/card";
import { Badge } from "@/components/core/ui/badge";
import { Button } from "@/components/core/ui/button";
import {
    Phone,
    MessageSquare,
    AlertTriangle,
    CheckCircle2,
    Clock,
    User,
    ChevronRight,
    Send,
    PhoneCall
} from "lucide-react";

// Import relocated components
import ReturnRiskCalculator from "@/views/Operations/ConfirmationCommand/FilteringCalling/ReturnRiskCalculator";
import { CallCenterScripts } from "@/views/Operations/ConfirmationCommand/FilteringCalling/CallCenterScripts";

// Mock order data for the Kanban
const MOCK_ORDERS = [
    { id: "ORD-001", customer: "Ahmed B.", phone: "0555123456", amount: 4500, risk: "low", status: "pending", wilaya: "Alger" },
    { id: "ORD-002", customer: "Fatima Z.", phone: "0661234567", amount: 12000, risk: "medium", status: "pending", wilaya: "Oran" },
    { id: "ORD-003", customer: "Karim M.", phone: "0770123456", amount: 25000, risk: "high", status: "pending", wilaya: "Constantine" },
    { id: "ORD-004", customer: "Samira L.", phone: "0550987654", amount: 3200, risk: "low", status: "confirmed", wilaya: "Blida" },
];

// Risk badge colors
const getRiskBadge = (risk: string) => {
    switch (risk) {
        case "low": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
        case "medium": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
        case "high": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
        default: return "";
    }
};

export default function ConfirmationCommandPage() {
    const [selectedOrder, setSelectedOrder] = useState(MOCK_ORDERS[0]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    <div className="p-2 bg-red-500/10 rounded-lg">
                        <Phone className="h-6 w-6 text-red-500" />
                    </div>
                    مركز التأكيد (Confirmation Center)
                </h1>
                <p className="text-muted-foreground mt-1">
                    Single Pane of Glass - Confirm orders faster, reduce Rotour
                </p>
            </div>

            {/* 3-Column Layout: Orders | Risk+Details | Scripts */}
            <div className="grid grid-cols-12 gap-6">

                {/* LEFT COLUMN: Orders Kanban (Couffa Queue) */}
                <div className="col-span-3">
                    <Card className="h-[calc(100vh-180px)] overflow-hidden">
                        <CardHeader className="pb-3 border-b">
                            <CardTitle className="text-base flex items-center justify-between">
                                <span>📦 Couffa Queue</span>
                                <Badge variant="secondary">{MOCK_ORDERS.length} orders</Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 overflow-y-auto h-full">
                            <div className="divide-y">
                                {MOCK_ORDERS.map((order) => (
                                    <button
                                        key={order.id}
                                        onClick={() => setSelectedOrder(order)}
                                        className={`w-full p-4 text-left hover:bg-muted/50 transition-colors ${selectedOrder.id === order.id ? "bg-primary/5 border-l-4 border-primary" : ""
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-mono text-xs text-muted-foreground">{order.id}</span>
                                            <Badge className={getRiskBadge(order.risk)}>
                                                {order.risk === "high" && <AlertTriangle className="h-3 w-3 mr-1" />}
                                                {order.risk}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium">{order.customer}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">{order.wilaya}</span>
                                            <span className="font-bold text-primary">{order.amount.toLocaleString()} DA</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* CENTER COLUMN: Risk Calculator + Order Details */}
                <div className="col-span-5 space-y-6">
                    {/* Selected Order Header */}
                    <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                        <CardContent className="py-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-indigo-100 text-sm">Active Order</p>
                                    <h2 className="text-2xl font-bold">{selectedOrder.customer}</h2>
                                    <p className="text-indigo-200 flex items-center gap-2 mt-1">
                                        <Phone className="h-4 w-4" />
                                        {selectedOrder.phone}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold">{selectedOrder.amount.toLocaleString()} DA</p>
                                    <p className="text-indigo-200">{selectedOrder.wilaya}</p>
                                </div>
                            </div>
                            {/* Quick Actions */}
                            <div className="flex gap-3 mt-4">
                                <Button className="bg-white/20 hover:bg-white/30 text-white flex-1">
                                    <PhoneCall className="h-4 w-4 mr-2" />
                                    Call Now
                                </Button>
                                <Button className="bg-green-600 hover:bg-green-700 text-white flex-1 font-semibold">
                                    <CheckCircle2 className="h-4 w-4 mr-2" />
                                    Confirmer (DZD)
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Embedded Risk Calculator */}
                    <ReturnRiskCalculator orderId={selectedOrder.id} />

                    {/* Order Timeline */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                Order Timeline
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">Order Received</p>
                                        <p className="text-xs text-muted-foreground">Today, 10:23 AM</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                                        <Clock className="h-4 w-4 text-yellow-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">Pending Confirmation</p>
                                        <p className="text-xs text-muted-foreground">Awaiting call</p>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* RIGHT COLUMN: Call Scripts + WhatsApp Bot */}
                <div className="col-span-4 space-y-6">
                    {/* Call Scripts */}
                    <CallCenterScripts />

                    {/* WhatsApp Quick Send */}
                    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2 text-green-700 dark:text-green-400">
                                <MessageSquare className="h-5 w-5" />
                                WhatsApp Quick Send
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button
                                className="w-full bg-green-600 hover:bg-green-700 text-white justify-between"
                            >
                                <span>📍 Send GPS Request</span>
                                <Send className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full border-green-300 text-green-700 hover:bg-green-50 justify-between"
                            >
                                <span>✅ Confirm & Skip Call</span>
                                <Send className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full border-green-300 text-green-700 hover:bg-green-50 justify-between"
                            >
                                <span>📦 Delivery Reminder</span>
                                <Send className="h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
