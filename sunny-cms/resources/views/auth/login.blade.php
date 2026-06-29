<x-guest-layout>
    <!-- Session Status -->
    <x-auth-session-status class="mb-4" :status="session('status')" />

    <form method="POST" action="{{ route('login') }}" class="space-y-5">
        @csrf

        <!-- Email Address -->
        <div>
            <label for="email" class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
            <input 
                id="email" 
                type="email" 
                name="email" 
                value="{{ old('email') }}" 
                required 
                autofocus 
                autocomplete="username"
                class="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-gray-600 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none text-sm"
                placeholder="name@sunnyremit.co.ke"
            >
            @error('email')
                <p class="text-rose-500 text-xs mt-1.5">{{ $message }}</p>
            @enderror
        </div>

        <!-- Password -->
        <div>
            <div class="flex items-center justify-between mb-2">
                <label for="password" class="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Password</label>
                @if (Route::has('password.request'))
                    <a class="text-xs text-brand-500 hover:text-brand-400" href="{{ route('password.request') }}">
                        Forgot password?
                    </a>
                @endif
            </div>
            <input 
                id="password" 
                type="password" 
                name="password" 
                required 
                autocomplete="current-password"
                class="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-gray-600 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none text-sm"
                placeholder="••••••••"
            >
            @error('password')
                <p class="text-rose-500 text-xs mt-1.5">{{ $message }}</p>
            @enderror
        </div>

        <!-- Remember Me -->
        <div class="flex items-center">
            <input 
                id="remember_me" 
                type="checkbox" 
                name="remember"
                class="rounded border-white/10 bg-white/5 text-brand-800 focus:ring-0 cursor-pointer"
            >
            <label for="remember_me" class="ms-2 text-xs font-medium text-gray-400 cursor-pointer select-none">Remember this device</label>
        </div>

        <div class="pt-2">
            <button 
                type="submit" 
                class="w-full py-4 rounded-2xl bg-brand-800 hover:bg-brand-700 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-brand-800/25 hover:shadow-brand-800/35 hover:-translate-y-0.5"
            >
                Authorize & Enter Portal
            </button>
        </div>
    </form>
</x-guest-layout>
