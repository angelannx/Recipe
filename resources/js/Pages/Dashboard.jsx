import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';

// Extended Recipe Database (10 Recipes)
const RECIPES = [
    {
        id: 'adobo',
        title: 'Classic Chicken Adobo',
        category: 'Chicken',
        badge: '★ Top Rated',
        description: 'Tender chicken simmered in garlic, soy sauce, cane vinegar, and crushed peppercorns. Rich, savory, and perfectly balanced.',
        image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=1200&auto=format&fit=crop',
        prepTime: '15 min',
        cookTime: '35 min',
        servings: '4 Pax',
        ingredients: [
            '1 kg Chicken (cut into serving pieces)',
            '½ cup Soy Sauce',
            '⅓ cup Cane Vinegar',
            '1 head Garlic (crushed)',
            '1 tsp Whole Peppercorns',
            '3-4 Dried Bay Leaves',
            '1 tbsp Cooking Oil'
        ],
        steps: [
            { title: 'Marinate the Chicken', desc: 'In a bowl, combine chicken with soy sauce, crushed garlic, and peppercorns. Marinate in the refrigerator for at least 30 minutes.' },
            { title: 'Sear the Meat', desc: 'Heat oil in a skillet over medium-high heat. Remove chicken pieces from marinade (reserve liquid) and sear until lightly browned on all sides.' },
            { title: 'Simmer & Reduce', desc: 'Pour back the marinade, add bay leaves, and cover. Simmer gently over medium-low heat for 20-25 minutes until chicken is tender.' },
            { title: 'Add Vinegar & Serve', desc: 'Pour in vinegar without stirring and bring to a boil uncovered for 3-5 minutes. Stir gently and simmer until sauce thickens. Serve hot!' }
        ]
    },
    {
        id: 'kare-kare',
        title: 'Authentic Beef Kare-Kare',
        category: 'Beef',
        badge: '👑 Gourmet Special',
        description: 'Rich and creamy peanut-based stew made with tender oxtail, tripe, eggplant, string beans, and banana blossom served with savory bagoong.',
        image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=1200&auto=format&fit=crop',
        prepTime: '25 min',
        cookTime: '1 hr 45 min',
        servings: '6 Pax',
        ingredients: [
            '1 kg Oxtail or Beef Chuck (cut into pieces)',
            '½ cup Ground Peanuts or Peanut Butter',
            '½ cup Ground Toasted Rice (for thickening)',
            '2 tbsp Annatto Seeds (soaked in warm water for color)',
            '1 Eggplant (sliced)',
            '1 bundle String Beans (Sitaw)',
            '1 Banana Blossom (Heart of Palm)',
            'Bagoong Alamang (Sautéed Shrimp Paste for serving)'
        ],
        steps: [
            { title: 'Tenderize Beef', desc: 'Boil oxtail and beef chuck in water until fork-tender (approx 1.5 hours in a pot or 40 minutes in a pressure cooker). Reserve broth.' },
            { title: 'Prepare Peanut Base', desc: 'In a large pot, sauté garlic and onions. Pour in beef broth, peanut butter, and strained annatto water for color. Stir until smooth.' },
            { title: 'Simmer Vegetables', desc: 'Add toasted rice powder to thicken sauce. Stir in eggplant, string beans, and banana blossom; cook until vegetables are crisp-tender.' },
            { title: 'Assemble & Serve', desc: 'Transfer to a serving bowl with tender beef. Serve hot alongside salty bagoong alamang!' }
        ]
    },
    {
        id: 'sinigang',
        title: 'Sour Pork Sinigang',
        category: 'Soup',
        badge: '🔥 Fan Favorite',
        description: 'A deeply comforting Filipino sour soup loaded with tender pork belly, radish, eggplant, yardlong beans, and fresh spinach.',
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1200&auto=format&fit=crop',
        prepTime: '20 min',
        cookTime: '50 min',
        servings: '6 Pax',
        ingredients: [
            '1 kg Pork Belly or Ribs (cubed)',
            '1 pack Tamarind Soup Base Mix',
            '1 medium Daikon Radish (sliced)',
            '1 Eggplant (sliced)',
            '1 bundle Yardlong Beans (Sitaw)',
            '2 Tomatoes (quartered)',
            '1 Onion (quartered)',
            '1 bundle Kangkong or Spinach'
        ],
        steps: [
            { title: 'Boil the Pork', desc: 'In a large pot, bring water to a boil. Add pork belly, onions, and tomatoes. Lower heat and simmer until pork is soft and tender (approx 35-40 mins).' },
            { title: 'Add Vegetables', desc: 'Add radish and eggplant. Simmer for another 5 minutes until veggies are slightly soft.' },
            { title: 'Sour the Soup', desc: 'Stir in the tamarind seasoning mix until dissolved. Season with fish sauce (patis) or salt to taste.' },
            { title: 'Final Greens & Serve', desc: 'Add yardlong beans and leafy greens (kangkong). Turn off heat, cover for 2 minutes to let greens wilt, and serve piping hot!' }
        ]
    },
    {
        id: 'bicol-express',
        title: 'Spicy Bicol Express',
        category: 'Pork',
        badge: '🌶️ Very Spicy',
        description: 'Pork belly cooked in rich coconut milk, shrimp paste (bagoong), and an abundance of sliced green and red chilies.',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200&auto=format&fit=crop',
        prepTime: '15 min',
        cookTime: '40 min',
        servings: '4 Pax',
        ingredients: [
            '800g Pork Belly (sliced into strips)',
            '2 cups Coconut Milk (Gata)',
            '1 cup Coconut Cream (Kakang Gata)',
            '2 tbsp Sautéed Shrimp Paste (Bagoong Alamang)',
            '10-15 Green Finger Chilies (Siling Haba, sliced)',
            '5 Red Chili Peppers (Siling Labuyo, chopped)',
            '1 head Garlic & 1 Onion (minced)',
            '1 tbsp Cooking Oil'
        ],
        steps: [
            { title: 'Sauté Aromatics', desc: 'Heat oil in a pan. Sauté garlic, onions, and shrimp paste for 2 minutes until fragrant.' },
            { title: 'Brown Pork', desc: 'Add pork belly strips and cook until light golden and fat starts to render.' },
            { title: 'Simmer in Coconut Milk', desc: 'Pour in coconut milk and sliced chilies. Reduce heat to low and simmer for 25 minutes until pork is tender and oil begins to separate.' },
            { title: 'Thicken with Coconut Cream', desc: 'Stir in coconut cream and simmer for an additional 10 minutes until sauce is thick and creamy. Serve with rice!' }
        ]
    },
    {
        id: 'sisig',
        title: 'Crispy Pork Sisig',
        category: 'Pork',
        badge: '🍺 Sizzling Delight',
        description: 'Finely chopped boiled and grilled pork, seasoned with calamansi juice, chili peppers, onions, and topped with a fresh raw egg.',
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=1200&auto=format&fit=crop',
        prepTime: '30 min',
        cookTime: '45 min',
        servings: '4 Pax',
        ingredients: [
            '1 kg Pork Jowl or Pork Belly',
            '1 cup Red Onions (diced)',
            '3-5 Red & Green Chili Peppers (Siling Labuyo)',
            '3 tbsp Calamansi Juice or Lime Juice',
            '2 tbsp Mayonnaise or Liver Spread',
            '1 tbsp Soy Sauce',
            '1 Raw Egg (for topping)',
            'Salt & Black Pepper to taste'
        ],
        steps: [
            { title: 'Boil & Grill', desc: 'Boil pork belly in salted water with peppercorns until tender. Drain and grill over high charcoal heat until crispy.' },
            { title: 'Chop & Mix', desc: 'Finely chop the grilled pork into small dice. In a bowl, mix with diced onions, sliced chili peppers, calamansi juice, soy sauce, and mayonnaise.' },
            { title: 'Sizzle on Plate', desc: 'Heat a cast-iron sizzling plate with melted butter. Transfer chopped sisig mix onto the hot plate.' },
            { title: 'Crack Egg & Serve', desc: 'Crack a raw egg on top of the sizzling sisig while hot. Mix well before eating with cold beverages or rice!' }
        ]
    },
    {
        id: 'tinola',
        title: 'Gingery Chicken Tinola',
        category: 'Soup',
        badge: '🍵 Health & Comfort',
        description: 'A soothing ginger-based soup with tender chicken pieces, green papaya, and fresh chili leaves or malunggay.',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop',
        prepTime: '15 min',
        cookTime: '35 min',
        servings: '5 Pax',
        ingredients: [
            '1 kg Chicken (cut into serving pieces)',
            '2 thumbs Ginger (julienned)',
            '1 medium Green Papaya or Sayote (wedged)',
            '1 cup Malunggay or Chili Leaves',
            '1 Onion & 4 cloves Garlic (sliced)',
            '2 tbsp Fish Sauce (Patis)',
            '6 cups Water or Rice Wash'
        ],
        steps: [
            { title: 'Sauté Ginger & Aromatics', desc: 'Heat oil in a pot. Sauté ginger, garlic, and onions until ginger is aromatic and softened.' },
            { title: 'Sear Chicken', desc: 'Add chicken pieces and fish sauce. Sauté for 5 minutes until chicken turns white on the outside.' },
            { title: 'Simmer Soup', desc: 'Pour in water or rice wash. Cover and simmer over medium heat for 20 minutes until chicken is tender.' },
            { title: 'Add Papaya & Leaves', desc: 'Add green papaya wedges and cook for 5 minutes. Turn off heat and toss in fresh malunggay leaves before serving.' }
        ]
    },
    {
        id: 'menudo',
        title: 'Fiesta Pork Menudo',
        category: 'Pork',
        badge: '🎉 Party Classic',
        description: 'Diced pork stew cooked in tomato sauce with liver, potatoes, carrots, raisins, and hotdog slices.',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop',
        prepTime: '20 min',
        cookTime: '45 min',
        servings: '6 Pax',
        ingredients: [
            '800g Pork Shoulder (diced)',
            '200g Pork Liver (diced)',
            '1 cup Tomato Sauce',
            '2 Potatoes & 1 Carrot (diced)',
            '2 Red Hotdogs (sliced)',
            '¼ cup Raisins',
            '1 Red Bell Pepper (diced)',
            '1 Onion & 4 cloves Garlic (minced)'
        ],
        steps: [
            { title: 'Pan-fry Liver & Veggies', desc: 'In oil, lightly fry potatoes, carrots, and pork liver for 3 minutes. Remove and set aside.' },
            { title: 'Sauté Pork', desc: 'Sauté garlic and onions, then add diced pork shoulder. Cook until pork turns light brown.' },
            { title: 'Simmer Tomato Sauce', desc: 'Add tomato sauce and ½ cup water. Cover and simmer for 25-30 minutes until meat is tender.' },
            { title: 'Combine Everything', desc: 'Stir in fried liver, potatoes, carrots, sliced hotdogs, raisins, and bell peppers. Simmer for 5 more minutes.' }
        ]
    },
    {
        id: 'lechon-kawali',
        title: 'Crispy Lechon Kawali',
        category: 'Pork',
        badge: '⚡ Extra Crispy',
        description: 'Deep-fried boiled pork belly slabs with crackling golden skin, served with liver sauce or spiced vinegar dip.',
        image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=1200&auto=format&fit=crop',
        prepTime: '15 min',
        cookTime: '1 hr 10 min',
        servings: '5 Pax',
        ingredients: [
            '1.5 kg Pork Belly Slab (whole)',
            '1 head Garlic (crushed)',
            '3 Dried Bay Leaves',
            '1 tbsp Whole Peppercorns',
            '2 tbsp Salt',
            'Cooking Oil for deep frying',
            'Spiced Vinegar or Mang Tomas Liver Sauce for dipping'
        ],
        steps: [
            { title: 'Boil Pork Slab', desc: 'Place pork belly slab in a pot with water, garlic, bay leaves, peppercorns, and salt. Simmer for 45 minutes until soft.' },
            { title: 'Dry the Skin', desc: 'Remove pork and pat thoroughly dry with paper towels. Rub salt on the skin and air-dry or refrigerate uncovered for 1 hour.' },
            { title: 'Deep Fry to Golden Crisp', desc: 'Heat generous oil in a deep pot. Deep fry pork slab on medium-high heat until skin blisters into golden crackling bubbles.' },
            { title: 'Chop & Serve', desc: 'Let rest for 5 minutes, then chop into bite-sized cubes. Serve with spiced vinegar or liver sauce!' }
        ]
    },
    {
        id: 'pares',
        title: 'Sizzling Beef Pares',
        category: 'Beef',
        badge: '⭐ Street Favorite',
        description: 'Braised beef stew cooked in star anise, soy sauce, and brown sugar. Served with fragrant garlic fried rice and beef broth.',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
        prepTime: '20 min',
        cookTime: '1 hr 15 min',
        servings: '5 Pax',
        ingredients: [
            '1 kg Beef Brisket or Chuck (cubed)',
            '2 Star Anise',
            '½ cup Soy Sauce',
            '½ cup Brown Sugar',
            '1 tbsp Ginger (minced)',
            '1 head Garlic (minced)',
            '1 tbsp Cornstarch (slurry for thickening)',
            'Garlic Rice & Chopped Scallions for serving'
        ],
        steps: [
            { title: 'Tenderize Beef', desc: 'Boil beef brisket in water with ginger until completely tender (about 1 hour or 30 minutes in a pressure cooker).' },
            { title: 'Sauté Aromatics', desc: 'In a separate pan, sauté minced garlic, ginger, and star anise until fragrant.' },
            { title: 'Simmer Sauce', desc: 'Add beef stock, soy sauce, and brown sugar. Add cooked beef and simmer for 15 minutes to absorb flavors.' },
            { title: 'Thicken & Serve', desc: 'Pour in cornstarch slurry to create a glossy, thick gravy. Serve alongside sinangag (garlic rice) and warm broth!' }
        ]
    },
    {
        id: 'afritada',
        title: 'Savory Chicken Afritada',
        category: 'Chicken',
        badge: '🥬 Healthy & Rich',
        description: 'A colorful tomato-based stew cooked with juicy chicken thighs, potatoes, carrots, and vibrant bell peppers.',
        image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1200&auto=format&fit=crop',
        prepTime: '15 min',
        cookTime: '40 min',
        servings: '4 Pax',
        ingredients: [
            '800g Chicken Thighs or Drumsticks',
            '1 cup Tomato Sauce',
            '2 Potatoes (cubed)',
            '1 Carrot (sliced)',
            '1 Red Bell Pepper (sliced)',
            '1 Green Bell Pepper (sliced)',
            '½ cup Green Peas',
            '3 cloves Garlic & 1 Onion (minced)'
        ],
        steps: [
            { title: 'Brown Vegetables', desc: 'Heat oil in a pan and lightly fry potatoes and carrots until edges turn golden. Remove and set aside.' },
            { title: 'Sauté & Sear Chicken', desc: 'Sauté garlic and onions, then add chicken. Cook until chicken turns light golden brown.' },
            { title: 'Simmer Stew', desc: 'Pour tomato sauce and a splash of water/broth. Cover and simmer on low heat for 25 minutes.' },
            { title: 'Combine & Serve', desc: 'Add fried potatoes, carrots, bell peppers, and peas. Cook for 5 more minutes until veggies are tender.' }
        ]
    }
];

export default function Dashboard({ auth }) {
    const [selectedRecipeId, setSelectedRecipeId] = useState(RECIPES[0].id);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Filter recipes based on Category & Search Query
    const filteredRecipes = RECIPES.filter(recipe => {
        const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
        const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Current Active Recipe
    const currentRecipe = RECIPES.find(r => r.id === selectedRecipeId) || filteredRecipes[0] || RECIPES[0];

    // Checklist state
    const [checkedItems, setCheckedItems] = useState({});

    const toggleIngredient = (index) => {
        const key = `${currentRecipe.id}-${index}`;
        setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-slate-800 leading-tight flex items-center gap-2">
                    <span>🍳</span> Gourmet Recipe Studio ({RECIPES.length} Recipes)
                </h2>
            }
        >
            <Head title={`Recipe - ${currentRecipe.title}`} />

            <div className="py-8 bg-gradient-to-br from-amber-50/40 via-orange-50/20 to-slate-100 min-h-screen">
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8 space-y-8">

                    {/* Welcome Banner */}
                    <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-6 text-white shadow-lg flex justify-between items-center">
                        <div>
                            <span className="text-xs uppercase tracking-widest font-bold text-amber-200">Logged in as {auth.user.name}</span>
                            <h1 className="text-2xl font-extrabold mt-1">What are we cooking today?</h1>
                        </div>
                        <span className="text-4xl hidden sm:block">📖</span>
                    </div>

                    {/* Filter & Search Bar */}
                    <div className="bg-white p-4 rounded-3xl shadow-md border border-slate-100 space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                            {/* Category Filter Pills */}
                            <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                                {['All', 'Chicken', 'Pork', 'Beef', 'Soup'].map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                                            selectedCategory === cat
                                                ? 'bg-orange-500 text-white shadow-md'
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            {/* Search Input */}
                            <div className="relative w-full sm:w-64">
                                <input
                                    type="text"
                                    placeholder="Search recipes..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-orange-500 focus:border-orange-500"
                                />
                                <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
                            </div>
                        </div>

                        {/* Horizontal Recipe Cards Strip */}
                        <div className="flex gap-3 overflow-x-auto pt-2 pb-2">
                            {filteredRecipes.length > 0 ? (
                                filteredRecipes.map((recipe) => {
                                    const isActive = recipe.id === currentRecipe.id;
                                    return (
                                        <button
                                            key={recipe.id}
                                            onClick={() => setSelectedRecipeId(recipe.id)}
                                            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap flex items-center gap-2 border ${
                                                isActive
                                                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                                                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-orange-50 hover:border-orange-200'
                                            }`}
                                        >
                                            <span>{isActive ? '⭐️' : '🍲'}</span>
                                            {recipe.title}
                                        </button>
                                    );
                                })
                            ) : (
                                <p className="text-xs text-slate-500 italic py-2">No recipes found matching your search.</p>
                            )}
                        </div>
                    </div>

                    {/* Main Recipe Card */}
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden transition-all duration-300">
                        <div className="grid grid-cols-1 lg:grid-cols-12">
                            {/* Recipe Image */}
                            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden group">
                                <img
                                    src={currentRecipe.image}
                                    alt={currentRecipe.title}
                                    className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-5 left-5 flex gap-2">
                                    <span className="px-3 py-1.5 rounded-full text-xs font-extrabold bg-amber-500 text-white uppercase tracking-wider shadow-md">
                                        {currentRecipe.badge}
                                    </span>
                                    <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-slate-800 shadow-md">
                                        {currentRecipe.category}
                                    </span>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="lg:col-span-5 p-8 flex flex-col justify-between bg-white">
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
                                        {currentRecipe.category} Recipe
                                    </span>
                                    <h1 className="text-3xl font-extrabold text-slate-900 mt-1 mb-4">
                                        {currentRecipe.title}
                                    </h1>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                        {currentRecipe.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-3 gap-3 p-4 bg-orange-50/60 rounded-2xl border border-orange-100 text-center">
                                    <div>
                                        <span className="text-xs font-semibold text-slate-400 block uppercase">Prep Time</span>
                                        <span className="text-base font-extrabold text-slate-800">{currentRecipe.prepTime}</span>
                                    </div>
                                    <div className="border-x border-orange-200/60">
                                        <span className="text-xs font-semibold text-slate-400 block uppercase">Cook Time</span>
                                        <span className="text-base font-extrabold text-slate-800">{currentRecipe.cookTime}</span>
                                    </div>
                                    <div>
                                        <span className="text-xs font-semibold text-slate-400 block uppercase">Servings</span>
                                        <span className="text-base font-extrabold text-slate-800">{currentRecipe.servings}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ingredients & Cooking Steps Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Ingredients */}
                        <div className="lg:col-span-4">
                            <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100 sticky top-6">
                                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                        <span>🛒</span> Ingredients
                                    </h2>
                                    <span className="text-xs font-semibold bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full">
                                        {currentRecipe.ingredients.length} items
                                    </span>
                                </div>

                                <ul className="space-y-2.5">
                                    {currentRecipe.ingredients.map((item, idx) => {
                                        const isChecked = !!checkedItems[`${currentRecipe.id}-${idx}`];
                                        return (
                                            <li key={idx}>
                                                <label className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-orange-50/50 transition cursor-pointer group">
                                                    <input
                                                        type="checkbox"
                                                        checked={isChecked}
                                                        onChange={() => toggleIngredient(idx)}
                                                        className="w-5 h-5 rounded-lg border-slate-300 text-orange-500 focus:ring-orange-400 transition"
                                                    />
                                                    <span className={`text-sm font-medium transition ${isChecked ? 'line-through text-slate-400' : 'text-slate-700 group-hover:text-slate-900'}`}>
                                                        {item}
                                                    </span>
                                                </label>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>

                        {/* Cooking Steps */}
                        <div className="lg:col-span-8">
                            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
                                <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100 flex items-center gap-2">
                                    <span>🔥</span> Step-by-Step Guide
                                </h2>

                                <div className="space-y-6">
                                    {currentRecipe.steps.map((step, idx) => (
                                        <div key={idx} className="flex gap-5 p-4 rounded-2xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
                                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white font-bold flex items-center justify-center text-base shadow-md shadow-orange-500/20 flex-shrink-0">
                                                0{idx + 1}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 text-base mb-1">{step.title}</h3>
                                                <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}