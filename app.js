if (typeof lucide !== "undefined") {
    lucide.createIcons()
    }
    
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || []
    let orders = JSON.parse(localStorage.getItem("orders")) || []
    
    // PRODUCTS
    
    const products = [
    
    {id:1,name:"Crimson Silk",price:7999,image:"https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500"},
    {id:2,name:"Azure Cotton",price:2499,image:"https://images.unsplash.com/photo-1641699862936-be9f49b1c38d?w=500"},
    {id:3,name:"Emerald Designer",price:12999,image:"https://images.unsplash.com/photo-1727430228383-aa1fb59db8bf?w=500"},
    {id:4,name:"Golden Bridal",price:25999,image:"https://images.unsplash.com/photo-1610030469839-f909584b43f1?w=500"},
    {id:5,name:"Midnight Blue",price:6599,image:"https://images.unsplash.com/photo-1641699862936-be9f49b1c38d?w=500"},
    {id:6,name:"Sunshine Cotton",price:1999,image:"https://images.unsplash.com/photo-1678705730064-a7ecbab4b3fb?w=500"},
    {id:7,name:"Royal Purple",price:9899,image:"https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500"},
    {id:8,name:"Pastel Floral",price:3299,image:"https://images.unsplash.com/photo-1610030469839-f909584b43f1?w=500"},
    {id:9,name:"Scarlet Wedding",price:18999,image:"https://images.unsplash.com/photo-1551854716-8b811be39e7e?w=500"},
    {id:10,name:"Classic Black",price:7299,image:"https://images.unsplash.com/photo-1610030469839-f909584b43f1?w=500"},
    {id:11,name:"Ivory Cotton",price:2199,image:"https://images.unsplash.com/photo-1610030469839-f909584b43f1?w=500"},
    {id:12,name:"Peacock Silk",price:11599,image:"https://images.unsplash.com/photo-1610189025857-f42fe6e8dd91?w=500"},
    {id:13,name:"Rose Bridal",price:20999,image:"https://images.unsplash.com/photo-1610030469839-f909584b43f1?w=500"},
    {id:14,name:"Mint Cotton",price:2799,image:"https://images.unsplash.com/photo-1610030469839-f909584b43f1?w=500"},
    {id:15,name:"Lavender Party",price:5899,image:"https://images.unsplash.com/photo-1610030469839-f909584b43f1?w=500"}
    
    ]
    
    // RENDER PRODUCTS
    
    function render(list = products){
    
    const grid = document.getElementById("product-grid")
    if(!grid) return
    
    grid.innerHTML = list.map(p=>`
    
    <div class="product-card">
    
    <img src="${p.image}">
    
    <div class="p-4">
    
    <h3 class="font-bold">${p.name}</h3>
    
    <p class="text-[#6a4f4b] font-semibold">₹${p.price}</p>
    
    <div class="flex gap-2 mt-3">
    
    <button onclick="showProduct(${p.id})"
    class="bg-black text-white px-3 py-1 rounded">
    View
    </button>
    
    <button onclick="addToCart(${p.id})"
    class="bg-[#6a4f4b] text-white px-3 py-1 rounded">
    Cart
    </button>
    
    <button onclick="addWishlist(${p.id})"
    class="bg-pink-500 text-white px-3 py-1 rounded">
    ❤
    </button>
    
    </div>
    
    </div>
    
    </div>
    
    `).join("")
    
    updateCart()
    updateWishlist()
    
    }
    
    // PRODUCT MODAL
    
    function showProduct(id){
    
    const p = products.find(x=>x.id===id)
    
    const img = document.getElementById("detail-img")
    const name = document.getElementById("detail-name")
    const price = document.getElementById("detail-price")
    const modal = document.getElementById("product-modal")
    const addBtn = document.getElementById("detail-add")
    
    if(!img || !name || !price || !modal || !addBtn) return
    
    img.src = p.image
    name.innerText = p.name
    price.innerText = "₹"+p.price
    
    addBtn.onclick = ()=>addToCart(id)
    
    modal.classList.remove("hidden")
    
    }
    
    function closeProduct(){
    const modal = document.getElementById("product-modal")
    if(modal) modal.classList.add("hidden")
    }
    
    // CART
    
    function addToCart(id){
    
    let item = cart.find(i=>i.id===id)
    
    if(item){
    item.qty++
    }else{
    cart.push({id:id, qty:1})
    }
    
    localStorage.setItem("cart",JSON.stringify(cart))
    
    updateCart()
    
    }
    
    function updateCart(){
    
    let count = cart.reduce((sum,i)=>sum+i.qty,0)
    
    const el = document.getElementById("cart-count")
    if(el) el.innerText = count
    
    }
    
    // QUANTITY CONTROLS
    
    function increaseQty(id){
    
    let item = cart.find(i=>i.id===id)
    if(item) item.qty++
    
    localStorage.setItem("cart",JSON.stringify(cart))
    
    updateCart()
    loadCart()
    
    }
    
    function decreaseQty(id){
    
    let item = cart.find(i=>i.id===id)
    
    if(!item) return
    
    item.qty--
    
    if(item.qty <= 0){
    cart = cart.filter(i=>i.id !== id)
    }
    
    localStorage.setItem("cart",JSON.stringify(cart))
    
    updateCart()
    loadCart()
    
    }
    
    function removeItem(id){
    
    cart = cart.filter(i=>i.id !== id)
    
    localStorage.setItem("cart",JSON.stringify(cart))
    
    updateCart()
    loadCart()
    
    }
    
    function clearCart(){
    
    cart = []
    
    localStorage.setItem("cart","[]")
    
    updateCart()
    loadCart()
    
    }
    
    // WISHLIST
    
    function addWishlist(id){
    
    if(!wishlist.includes(id)){
    wishlist.push(id)
    localStorage.setItem("wishlist",JSON.stringify(wishlist))
    }
    
    updateWishlist()
    
    }
    
    function updateWishlist(){
    
    const el = document.getElementById("wishlist-count")
    if(el) el.innerText = wishlist.length
    
    }
    
    function removeWishlist(id){
    
    wishlist = wishlist.filter(i => i !== id)
    
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
    
    loadWishlist()
    updateWishlist()
    
    }
    
    // SEARCH
    
    const search = document.getElementById("search-bar")
    
    if(search){
    
    search.addEventListener("input",(e)=>{
    
    const term = e.target.value.toLowerCase()
    
    const filtered = products.filter(p =>
    p.name.toLowerCase().includes(term)
    )
    
    render(filtered)
    
    })
    
    }
    
    // CART PAGE
    
    function loadCart(){
    
    const box = document.getElementById("cart-items")
    if(!box) return
    
    box.innerHTML = ""
    
    let total = 0
    
    cart.forEach(item=>{
    
    const p = products.find(x=>x.id===item.id)
    
    const subtotal = p.price * item.qty
    
    total += subtotal
    
    box.innerHTML += `
    
    <div class="bg-white p-4 rounded shadow flex gap-6 items-center">
    
    <img src="${p.image}" class="w-28 h-28 object-cover rounded">
    
    <div class="flex-1">
    
    <h3 class="font-bold text-lg">${p.name}</h3>
    
    <p class="text-[#6a4f4b] font-semibold">₹${p.price}</p>
    
    <div class="flex gap-2 mt-2">
    
    <button onclick="decreaseQty(${item.id})" class="bg-gray-200 px-2">−</button>
    
    <span>${item.qty}</span>
    
    <button onclick="increaseQty(${item.id})" class="bg-gray-200 px-2">+</button>
    
    </div>
    
    </div>
    
    <div class="text-right">
    
    <p class="font-bold text-lg">₹${subtotal}</p>
    
    <button onclick="removeItem(${item.id})"
    class="text-red-500 text-sm">
    Remove
    </button>
    
    </div>
    
    </div>
    
    `
    
    })
    
    const totalEl = document.getElementById("cart-total")
    if(totalEl) totalEl.innerText = total
    
    }
    
    // WISHLIST PAGE
    
    function loadWishlist(){
    
    const box = document.getElementById("wishlist-items")
    if(!box) return
    
    box.innerHTML=""
    
    wishlist.forEach(id=>{
    
    const p = products.find(x=>x.id===id)
    
    box.innerHTML+=`
    
    <div class="product-card">
    
    <img src="${p.image}">
    
    <div class="p-4">
    
    <h3>${p.name}</h3>
    
    <p>₹${p.price}</p>
    
    <div class="flex gap-2 mt-3">
    
    <button onclick="addToCart(${p.id})"
    class="bg-[#6a4f4b] text-white px-3 py-1 rounded">
    Add To Cart
    </button>
    
    <button onclick="removeWishlist(${p.id})"
    class="bg-red-500 text-white px-3 py-1 rounded">
    Remove
    </button>
    
    </div>
    
    </div>
    
    </div>
    
    `
    
    })
    
    }
    
    // PAYMENT PAGE
    
    function loadPayment(){
    
    const box = document.getElementById("payment-items")
    if(!box) return
    
    let total = 0
    box.innerHTML=""
    
    cart.forEach(i=>{
    
    const p = products.find(x=>x.id===i.id)
    
    total += p.price*i.qty
    
    box.innerHTML += `<p>${p.name} x${i.qty} = ₹${p.price*i.qty}</p>`
    
    })
    
    const totalEl = document.getElementById("payment-total")
    if(totalEl) totalEl.innerText = total
    
    }
    
    // INITIAL LOAD
    
    window.addEventListener("load",()=>{
    
    const loader = document.getElementById("loading-spinner")
    if(loader) loader.style.display="none"
    
    render()
    loadCart()
    loadWishlist()
    loadPayment()
    
    })

// ORDER CONFIRMATION PAGE

function loadConfirmation(){

    const data = JSON.parse(localStorage.getItem("lastOrder"))
    
    if(!data) return
    
    const name = document.getElementById("conf-name")
    const address = document.getElementById("conf-address")
    const payment = document.getElementById("conf-payment")
    const items = document.getElementById("conf-items")
    const total = document.getElementById("conf-total")
    
    if(!name) return
    
    name.innerText = data.name
    address.innerText = data.address
    payment.innerText = data.payment
    total.innerText = data.total
    
    items.innerHTML = ""
    
    data.items.forEach(i=>{
    
    const p = products.find(x=>x.id===i.id)
    
    items.innerHTML += `
    <p>${p.name} x${i.qty} = ₹${p.price*i.qty}</p>
    `
    
    })
    
    }
    
    
    // INITIAL LOAD (ONLY ONE)
    
    window.addEventListener("load",()=>{
    
    const loader = document.getElementById("loading-spinner")
    if(loader) loader.style.display="none"
    
    render()
    loadCart()
    loadWishlist()
    loadPayment()
    loadConfirmation()
    
    })

    function placeOrder(){

        const name = document.getElementById("cust-name")?.value
        const address = document.getElementById("cust-address")?.value
        const method = document.getElementById("payment-method")?.value
        
        if(!name || !address){
        alert("Please enter customer details")
        return
        }
        
        let total = 0
        
        cart.forEach(i=>{
        const p = products.find(x=>x.id===i.id)
        total += p.price * i.qty
        })
        
        const order = {
        name,
        address,
        payment:method,
        items:cart,
        total,
        date:new Date().toLocaleString()
        }
        
        orders.push(order)
        
        localStorage.setItem("orders",JSON.stringify(orders))
        localStorage.setItem("lastOrder",JSON.stringify(order))
        
        generateBill(order)
        
        cart=[]
        localStorage.setItem("cart","[]")
        
        window.location.href="confirmation.html"
        
        }

        function generateBill(order){

            if(!window.jspdf) return
            
            const { jsPDF } = window.jspdf
            
            let doc = new jsPDF()
            
            doc.setFontSize(20)
            doc.text("VastraAI Invoice",20,20)
            
            doc.setFontSize(12)
            
            doc.text("Customer: "+order.name,20,40)
            doc.text("Address: "+order.address,20,50)
            doc.text("Payment: "+order.payment,20,60)
            doc.text("Date: "+order.date,20,70)
            
            let y = 90
            
            order.items.forEach(i=>{
            
            const p = products.find(x=>x.id===i.id)
            
            doc.text(`${p.name} x${i.qty} = ₹${p.price*i.qty}`,20,y)
            
            y += 10
            
            })
            
            doc.text("Total: ₹"+order.total,20,y+10)
            
            doc.save("VastraAI-Invoice.pdf")
            
            }