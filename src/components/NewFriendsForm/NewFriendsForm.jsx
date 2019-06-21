/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from "react";
import { Field, reduxForm } from "redux-form";
import styles from "./NewFriendsForm.css";

const lessThan = max => (value, previousValue, allValues) =>
  parseFloat(value) < parseFloat(allValues[max]) ? value : previousValue;
const greaterThan = min => (value, previousValue, allValues) =>
  parseFloat(value) >= parseFloat(allValues[min]) ? value : previousValue;

// eslint-disable-next-line react/prefer-stateless-function
class NewFriendsForm extends React.Component {
  render() {
    return (
      <form className={styles.filterForm}>
        <div className={styles.item}>
          <Field
            className={styles.inputSeach}
            name="name"
            type="text"
            placeholder="Search"
            required
            component="input"
          />
        </div>
        <div className={styles.item}>
          <Field
            className={styles.inputSex}
            type="radio"
            name="sex"
            id="male"
            value="male"
            required
            component="input"
          />
          <label htmlFor="male">male</label>
          <Field
            className={styles.inputSex}
            type="radio"
            name="sex"
            id="female"
            value="female"
            required
            component="input"
          />
          <label htmlFor="female">female</label>
          <Field
            className={styles.inputSex}
            type="radio"
            name="sex"
            value="all"
            id="all"
            required
            component="input"
          />
          <label htmlFor="all">not specifed</label>
        </div>
        <div className={styles.item}>
          <label htmlFor="ageFrom">age from</label>
          <Field
            className={styles.inputAge}
            name="min"
            id="ageFrom"
            type="number"
            normalize={lessThan("max")}
            required
            component="input"
          />
          <Field
            className={styles.inputAge}
            name="max"
            id="ageTo"
            type="number"
            required
            component="input"
            normalize={greaterThan("min")}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor="work">works for</label>
          <Field
            className={styles.inputWork}
            name="work"
            id="work"
            type="text"
            required
            component="input"
            placeholder="work for"
          />
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: "newFriends",
  destroyOnUnmount: false,
  initialValues: {
    sex: "all",
    name: "",
    min: "18",
    max: "55",
    work: ""
  }
})(NewFriendsForm);
