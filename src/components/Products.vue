<template>
  <div id="products">
    <h2>Products</h2>

    <table v-if="products.length">
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Description</th>
        <th>Category</th>
        <th>Action</th>
      </tr>
      <tr v-for="(product, index) in products" :key="index">
        <td>{{product.id}}</td>
        <td>{{product.name}}</td>
        <td>{{product.description}}</td>
        <td>{{product.category}}</td>
        <td>
          <button @click="remove(product.id)">Remove</button>
          <button @click="edit(product.id)">Edit</button>
        </td>
      </tr>
    </table>

    <div v-else>
      <h4>No available product</h4>
    </div>

    <form @submit.prevent="add">
      <p>
        <input
          required
          style="margin-left: 3px;"
          v-model="newProduct.name"
          placeholder="Product name"
        />
      </p>
      <p>
        <input
          required
          style="margin-left: 3px;"
          v-model="newProduct.description"
          placeholder="Product description"
        />
      </p>
      <p>
        <input
          required
          style="margin-left: 3px;"
          v-model="newProduct.category"
          placeholder="Product category"
        />
      </p>
      <p>
        <button>Add product</button>
      </p>
    </form>

    <modal
      v-show="isModalVisible"
      @close="closeModal"
      :product="editProduct"
      @updated="productUpdated($event)"
    />
  </div>
</template>

<script>
import { uuid } from "vue-uuid";
import modal from "./Modal";
export default {
  name: "Login",
  components: {
    modal
  },
  data() {
    return {
      products: [],
      newProduct: {
        id: uuid.v1(),
        name: "",
        description: "",
        category: ""
      },
      editProduct: null,
      isModalVisible: false
    };
  },
  mounted() {
    if (localStorage.getItem("products")) {
      try {
        this.products = JSON.parse(localStorage.getItem("products"));
      } catch (e) {
        localStorage.removeItem("products");
      }
    }
  },
  methods: {
    productUpdated() {
      this.save();
    },

    showModal() {
      this.isModalVisible = true;
    },

    closeModal() {
      this.isModalVisible = false;
    },

    add() {
      if (!this.newProduct) {
        return;
      }

      this.products.push(this.newProduct);

      this.newProduct = {
        id: uuid.v1(),
        name: "",
        description: "",
        category: ""
      };

      this.save();
    },
    remove(id) {
      this.products = this.products.filter(product => product.id !== id);
      this.save();
    },

    save() {
      const parsed = JSON.stringify(this.products);
      localStorage.setItem("products", parsed);
    },

    edit(id) {
      this.isModalVisible = true;
      let editProduct = this.products.find(product => product.id == id);
      this.editProduct = editProduct;
    }
  }
};
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
#products {
  padding: 30px;
}
</style>
