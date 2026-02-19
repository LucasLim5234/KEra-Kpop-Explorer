<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Idol;

class IdolController extends Controller
{

    // List all idols with filters
    // IdolController.php
    public function index(Request $request)
    {
        $query = Idol::query();

        // Use when() to only apply filter if the value is present and not empty
        $query->when($request->filled('company'), function ($q) use ($request) {
            return $q->where('company', $request->company);
        });

        $query->when($request->filled('debut_year'), function ($q) use ($request) {
            return $q->where('debut_year', $request->debut_year);
        });

        return response()->json($query->orderBy('debut_year', 'desc')->get());
    }


    // Show detail for a single idol
    public function show($id)
    {
        $idol = Idol::findOrFail($id);
        return response()->json($idol);
    }
}
