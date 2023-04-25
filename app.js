

let app = new Vue({
  el: "#App",
  data: {

    subjects: lessons,
    searchBar: null,
    cart: {
      currency: '$',
      lessons: [],
      name: '',
      phone: '',
    },
    showCart: false,
    sortAscending: true,
    sortBy: 'Price',
  },
  methods: {
    showShoppingCart: function(cart) {
      this.showCart = cart;
    },
    addToCart: function (lesson) {
      lesson.spaces--;
      this.cart.lessons.push(lesson.id);
    },
    sortDataBy: function(sortBy) {
      this.sortBy = sortBy;
      console.log(this.sortBy);
      if(this.sortBy == "Price") {
        return this.subjects.sort(this.sortAscending? (a,b) => a.price - b.price : (a,b) => b.price - a.price);
      } else if(this.sortBy == "Availability"){
        return this.subjects.sort(this.sortAscending? (a,b) => a.spaces - b.spaces : (a,b) => b.spaces - a.spaces);
      } else if(this.sortBy == "Location") {
        return this.subjects.sort(this.sortAscending? (a,b) => a.location.localeCompare(b.location) : (a,b) => b.location.localeCompare(a.location));
      } else {
        return this.subjects.sort(this.sortAscending? (a,b) => a.subjectName.localeCompare(b.subjectName) : (a,b) => b.subjectName.localeCompare(a.subjectName));
      }
    },
    sortInAscendingOrder: function(ascending) {
      this.sortAscending = ascending;
      console.log(this.sortAscending);
      return this.sortDataBy(this.sortBy);
    },
    removeFromCart: function (lesson) {
      let count = this.itemCountInCart(lesson);
      lesson.spaces += count;
      this.cart.lessons = this.cart.lessons.filter((item) => item != lesson.id);
    },
    minusFromCart: function(lesson) {
      let count = this.itemCountInCart(lesson);
      if(count > 0) {
        lesson.spaces++;
        this.cart.lessons.splice(this.cart.lessons.indexOf(lesson.id), 1);
      }
    },
    checkout: function () {
      if (this.cart.lessons.length > 0) {
        if(this.cart.name == '' || this.cart.phone == '') {
          alert("Please enter your name and phone number");
        } else {
          this.cart.lessons = [];
          this.cart.name='';
          this.cart.phone = '';
          alert("Thank you for your purchase!");
        }
      } else {
        alert("Your cart is empty!");
      }
    },
    itemCountInCart: function(lesson) {
      let count = 0;
      this.cart.lessons.forEach((item) => {
        if(item == lesson.id) {
          count++;
        }
      });
      return count;
    },
    totalCost: function() {
      let total = 0;
      this.cart.lessons.forEach((item) => {
        total += this.subjects.find((lesson) => lesson.id == item).price;
      });
      return total;
    },
    canAddToCart: function(lesson) {
      return lesson.spaces > 0;
    },
    canCheckout: function() {
      return this.cart.lessons.length > 0 && this.cart.name && this.cart.phone;
    },
    getLocationShort: function(lesson) {
      return lesson.location.split(" ").map((s) => s[0].toUpperCase()).join("");
    },
    searchedLessons: function() {
      if (!this.searchBar) return this.subjects;
      let searched = this.searchBar.toLowerCase();
      return this.subjects.filter(l => {
          return l.subjectName.toLowerCase().includes(searched) || l.location.toLowerCase().includes(searched);
      });
    },
  },
});

app.sortInAscendingOrder(true);
app.sortDataBy(app.sortBy);