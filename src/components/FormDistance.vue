<template>
  <div class="form_distance">
    <div class="form">
      <form :disabled="isSendRequest" action>
        <input class="input" v-model="cityFrom" type="text" placeholder="Пункт А">
        <input class="input" v-model="cityTo" type="text" placeholder="Пункт Б">
      </form>
      <div class="buttons">
        <button @click="subForm">GO!</button>
        <button @click="clearForm">Clear</button>
      </div>
    </div>
    <h1>Журнал запросов:</h1>
    <ul>
      <li v-for="answer in answers" :key="answer.text" v-bind:class="{ error: answer.error }">
        <i>{{ answer.text }}</i>
      </li>
    </ul>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "FormDistance",
  data: () => {
    return {
      cityFrom: "",
      cityTo: "",
      isSendRequest: false,
      result: "",
      nowDate: "",
      answers: []
    };
  },
  methods: {
    subForm: async function() {
      if (!this.cityTo || !this.cityFrom) {
        return (this.error = true);
      }
      this.isSendRequest = true;
      let googleService = new google.maps.DistanceMatrixService();
      this.nowDate = new Date();
      let formatedDate = moment(this.nowDate).format("MM/DD в HH:mm");

      try {
        googleService.getDistanceMatrix(
          {
            origins: [this.cityFrom],
            destinations: [this.cityTo],
            travelMode: "DRIVING",
            avoidHighways: false,
            avoidTolls: false
          },
          (response) => {
            this.result = response;

            if (
              !this.result.originAddresses[0] ||
              !this.result.destinationAddresses[0]
            ) {
              return this.answers.push({
                text: `${formatedDate} Access denied`,
                error: true
              });
            }

            this.answers.push({
              text: `${formatedDate} ${this.result.originAddresses[0].replace(
                        /,.*/g,
                        ""
                      )} - ${this.result.destinationAddresses[0].replace(
                        /,.*/g,
                        ""
                      )} = ${this.result.rows[0].elements[0].distance.text}`,
              error: false
            });
          }
        );
      } catch (e) {
        console.error(e);
      }

      this.isSendRequest = false;
    },
    clearForm: function() {
      this.cityFrom = "";
      this.cityTo = "";
    }
  }
};
</script>

<style>
.form_distance {
  margin: 20px;
}
.form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}
.buttons > *,
input {
  border: 2px solid black;
  background-color: transparent;
}
.input {
  height: 45px;
  border-radius: 10px;
  margin: 10px;
}
.buttons {
  display: flex;
  flex-wrap: nowrap;
}
.buttons > * {
  margin: 10px;
  border-radius: 50%;
  min-width: 80px;
  height: 40px;
}
ul {
  list-style-type: none;
  padding-left: 20px;
}

.error {
  color: red;
}

::-webkit-input-placeholder {
  font-style: italic;
  color: black;
}
:-moz-placeholder {
  font-style: italic;
  color: black;
}
::-moz-placeholder {
  font-style: italic;
  color: black;
}
:-ms-input-placeholder {
  font-style: italic;
  color: black;
}
</style>
