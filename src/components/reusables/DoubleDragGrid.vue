<template>
  <div class="row">
    <div class="col-12">
      <div class="row">
        <div class="col-lg-6">
          <div class="row pendingList">
            <div class="col-12">
              <div class="row">
                <div class="col-9">
                  <h6 class="list-title">To-do list</h6>
                </div>
                <div class="col-3">
                  <button class="btn add-btn" v-on:click="addNewToDo">
                    <img src="/src/resources/images/add.png" />
                  </button>
                </div>
              </div>
              <hr />
              <draggable
                id="pendingArea"
                class="list-group"
                :list="pendingList"
                @end="onMoveCallback"
                group="people"
              >
                <div
                  class="list-group-item"
                  v-for="(element, index) in pendingList"
                  :key="element.name"
                >
                  <img
                    class="pending-image"
                    v-if="element.image.length > 0"
                    v-bind:src="element.image"
                  />
                  <div>
                    <input
                      type="checkbox"
                      class="item-chbox"
                      @change.prevent="moveToDone($event, index)"
                    />
                    <input
                      :ref="'text'"
                      class="item-label"
                      v-model="element.text"
                      v-on:blur="pendingInputLostFocus(index)"
                    />
                    <button
                      class="btn options-btn"
                      v-on:click="showPendingItemsOptionsPanel($event, index)"
                    >
                      <img src="/src/resources/images/dots.jpg" />
                    </button>
                    <div
                      class="item-options-panel pending-option"
                      v-on:blur="hidePendingItemOptionsPanel($event, index)"
                      tabindex="0"
                    >
                      <div class="opt-panel">
                        <img class="options-imgs" src="/src/resources/images/img-icon.png" />
                        <label class="options-labels">Image</label>
                        <input
                          class="new-image-btn"
                          type="file"
                          accept="image/*"
                          @change="uploadImage($event, index)"
                        />
                      </div>
                      <div class="spacer"></div>
                      <button class="delete-item-btn" v-on:click="deleteItem(index, 'pending')">
                        <img class="options-imgs" src="/src/resources/images/solo-trash.png" />
                        <label class="options-labels">Delete</label>
                      </button>
                    </div>
                  </div>
                </div>
              </draggable>
            </div>
          </div>
          <div style="height:60px; background:white"></div>
        </div>
        <div class="col-lg-6">
          <div class="row doneList">
            <div class="col-12">
              <div class="row">
                <div class="col-9">
                  <h6 class="list-title">Done</h6>
                </div>
                <div class="col-3">
                  <button class="btn add-btn" v-on:click="deleteAllDone">
                    <img src="/src/resources/images/trash.png" />
                  </button>
                </div>
              </div>
              <hr />
              <draggable
                id="doneArea"
                class="list-group"
                :list="doneList"
                @end="onMoveCallback"
                group="people"
              >
                <div
                  class="list-group-item"
                  v-for="(element, index) in doneList"
                  :key="element.name"
                >
                  <img
                    class="pending-image"
                    v-if="element.image.length > 0"
                    v-bind:src="element.image"
                  />
                  <div>
                    <img type="checkbox" class="item-chbox" src="/src/resources/images/done.png" />
                    <label class="item-label">{{ element.text }}</label>
                    <button
                      class="btn options-btn"
                      v-on:click="showDoneItemsOptionsPanel($event, index)"
                    >
                      <img src="/src/resources/images/dots.jpg" />
                    </button>
                    <div
                      class="item-options-panel half-panel done-option"
                      v-on:blur="hideDoneItemOptionsPanel($event, index)"
                      tabindex="0"
                    >
                      <button
                        class="delete-item-btn del-btn-2"
                        v-on:click="deleteItem(index, 'done')"
                      >
                        <img class="options-imgs" src="/src/resources/images/solo-trash.png" />
                        <label class="options-labels">Delete</label>
                      </button>
                    </div>
                  </div>
                </div>
              </draggable>
            </div>
          </div>
          <div style="height:60px; background:white"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  name: "two-lists",
  display: "Two Lists",
  order: 1,
  components: {
    draggable
  },
  data() {
    return {
      pendingList: [],
      doneList: []
    };
  },
  created: function() {
    this.fetchItems();
  },
  methods: {
    fetchItems() {
      let uri = "http://localhost:4000/todos";
      this.axios.get(uri).then(response => {
        response.data.forEach(todo => {
          todo.id = todo._id;
          if (todo.done) {
            this.doneList.unshift(todo);
          } else {
            this.pendingList.unshift(todo);
          }
        });
      });
    },
    addNewToDo() {
      var newToDo = { id: undefined, text: "", image: "", done: false };
      this.pendingList.unshift(newToDo);
      this.$nextTick(() => {
        let index = 0;
        let input = this.$refs.text[index];
        input.focus();
      });
    },
    deleteAllDone() {
      let uri = "http://localhost:4000/todos/delete";
      this.axios.get(uri);
      this.doneList = [];
    },
    deleteItem(index, list) {
      var todo = {};
      if (list == "pending") {
        todo = this.pendingList[index];
        this.pendingList.splice(index, 1);
      } else {
        todo = this.doneList[index];
        this.doneList.splice(index, 1);
      }
      if (todo.id == undefined) return;
      let uri = "http://localhost:4000/todos/delete/" + todo.id;
      this.axios.get(uri);
    },
    updateTodo(todo) {
      let uri = "http://localhost:4000/todos/update/" + todo.id;
      this.axios.post(uri, todo).then(response => {});
    },
    uploadImage(event, index) {
      var formData = new FormData();
      let token = this.$store.state.user.token;
      formData.append("image", event.target.files[0]);
      this.axios
        .post("http://localhost:4000/uploads/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "token": token
          }
        })
        .then(response => {
          this.pendingList[index].image =
            "/src/resources/images/todos/" + response.data;
          this.updateTodo(this.pendingList[index]);
        });
    },
    onMoveCallback(evt) {
      if (evt.to.id == "doneArea") {
        this.doneList[evt.newIndex].done = true;
        this.updateTodo(this.doneList[evt.newIndex]);
      } else {
        this.pendingList[evt.newIndex].done = false;
        this.updateTodo(this.pendingList[evt.newIndex]);
      }
    },
    moveToDone(evt, index) {
      evt.target.checked = false;
      var item = this.pendingList[index];
      item.done = true;
      this.pendingList.splice(index, 1);
      this.doneList.unshift(item);
      this.updateTodo(item);
      evt.preventDefault();
    },
    pendingInputLostFocus(index) {
      if (this.pendingList[index].id == undefined) {
        let uri = "http://localhost:4000/todos/add";
        this.axios.post(uri, this.pendingList[index]).then(response => {
          this.pendingList[index].id = response.data.todo._id;
        });
      } else {
        this.updateTodo(this.pendingList[index]);
      }
    },
    showPendingItemsOptionsPanel(event, index) {
      var panel = $($(".pending-option")[index]);
      panel.css("z-index", 1);
      panel.focus();
    },
    hidePendingItemOptionsPanel(event, index) {
      setTimeout(() => {
        var panel = $($(".pending-option")[index]);
        panel.css("z-index", -1);
      }, 150);
    },
    showDoneItemsOptionsPanel(event, index) {
      var panel = $($(".done-option")[index]);
      panel.css("z-index", 1);
      panel.focus();
    },
    hideDoneItemOptionsPanel(event, index) {
      setTimeout(() => {
        var panel = $($(".done-option")[index]);
        panel.css("z-index", -1);
      }, 150);
    }
  }
};
</script>
<style lang="scss" scoped>
.pendingList {
  margin-right: 0px;
  padding-top: 10px;
  padding-bottom: 30px;
  background: #f5f6fa;
}
.doneList {
  margin-left: 0px;
  padding-top: 10px;
  padding-bottom: 30px;
  background: #f5f6fa;
}
.list-title {
  margin: 20px 0 20px 8px;
}
.list-group-item {
  border: 0;
  margin: 8px;
  -moz-border-radius: 8px;
  -webkit-border-radius: 8px;
  -khtml-border-radius: 8px;
  border-radius: 8px;
}
.item-chbox {
  width: 16px;
  height: 16px;
  vertical-align: middle;
  margin-right: 15px;
}
.item-label {
  vertical-align: middle;
  margin-bottom: 0;
  width: 80%;
  border-style: none;
}
.add-btn {
  float: right;
  margin-top: 6px;
}
.options-btn {
  padding: 0;
  float: right;
  height: 46px;
  margin: -10px 0;
  width: 46px;
  margin-right: -15px;
  img {
    height: 24px;
  }
}
.item-options-panel {
  width: 200px;
  height: 102px;
  position: absolute;
  right: 12px;
  z-index: -1;
}
.half-panel {
  height: 50px;
}
.spacer {
  height: 2px;
  width: 100%;
  background: black;
  opacity: 0.3;
  position: absolute;
  top: 50px;
}
.new-image-btn {
  position: absolute;
  width: 100%;
  height: 50px;
  top: 0;
  border: 0;
  padding: 0;
  text-align: left;
  opacity: 0;
  position: absolute;
  left: 0;
}
.delete-item-btn {
  position: absolute;
  top: 52px;
  width: 100%;
  height: 50px;
  border: 0;
  padding: 0;
  text-align: left;
}
.del-btn-2 {
  top: 0;
}
.new-image-btn:hover {
  background: #ccc;
}
.delete-item-btn:hover {
  background: #ccc;
}
.options-imgs {
  cursor: pointer;
  max-height: 24px;
  margin: 13px;
}
.options-labels {
  cursor: pointer;
  height: 20px;
  margin-bottom: 0px;
  margin-top: -5px;
  font-weight: 600;
  opacity: 0.5;
}
.opt-panel {
  background: #f0f0f0;
  height: 50px;
}
.opt-panel:hover {
  background: #ccc;
}
.pending-image {
  max-height: 250px;
  width: calc(100% + 40px);
  margin: -12px -20px 12px -20px;
}
@media (max-width: 992px)  {
  .pendingList {
    margin-left: 0px;
  }
  .doneList {
    margin-right: 0px;
  }
}
</style>