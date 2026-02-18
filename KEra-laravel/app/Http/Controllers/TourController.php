<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class TourController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->query('search');
        $group = $request->query('group');
        $response = Http::get('https://app.ticketmaster.com/discovery/v2/events.json', [
            'apikey' => config('services.ticketmaster.api_key'),
            'keyword' => 'kpop',
            'classificationName' => 'Music',
            'size' => 200,
        ]);

        if (!$response->successful()) {
            return response()->json([], 500);
        }
        $data = $response->json();
        $events = $data['_embedded']['events'] ?? [];

        // Extract group name from event name (assume group name is before ' at ' or first word)
        $groups = collect($events)->map(function ($event) {
            $name = $event['name'] ?? '';
            $groupName = preg_split('/ at |\sLive|\sConcert|\sShow/i', $name)[0];
            return [
                'id' => md5($groupName),
                'name' => trim($groupName),
                'image' => $event['images'][0]['url'] ?? '',
                'description' => $event['info'] ?? '',
            ];
        })->unique('name')->values();

        // If group param is set, return concerts for that group
        if ($group) {
            $concerts = collect($events)
                ->filter(function ($event) use ($group) {
                    $name = $event['name'] ?? '';
                    return stripos($name, $group) !== false;
                })
                ->map(function ($event) {
                    return [
                        'id' => $event['id'] ?? null,
                        'name' => $event['name'] ?? '',
                        'date' => $event['dates']['start']['localDate'] ?? '',
                        'time' => $event['dates']['start']['localTime'] ?? '',
                        'venue' => $event['_embedded']['venues'][0]['name'] ?? '',
                        'city' => $event['_embedded']['venues'][0]['city']['name'] ?? '',
                        'country' => $event['_embedded']['venues'][0]['country']['name'] ?? '',
                        'ticket_url' => $event['url'] ?? '',
                        'image' => $event['images'][0]['url'] ?? '',
                    ];
                })
                ->sortBy('date')
                ->values();
            return response()->json($concerts);
        }

        // If search param, filter groups
        if ($search) {
            $groups = $groups->filter(function ($group) use ($search) {
                return stripos($group['name'], $search) !== false;
            })->values();
        }
        return response()->json($groups);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
