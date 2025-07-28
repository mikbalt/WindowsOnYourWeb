import styled from "styled-components";

const StyledContact = styled.div`
  background: #ece9d8;
  font-family: "MS Sans Serif", sans-serif;
  font-size: 11px;
  height: 100%;
  overflow: auto;

  .contact-container {
    border: 2px outset #ece9d8;
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 100%;
  }

  .contact-info {
    background: linear-gradient(180deg, #c0c0c0 0%, #a0a0a0 100%);
    border-right: 2px inset #ece9d8;
    color: #000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;

    h1 {
      font-family: "MS Sans Serif", sans-serif;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    p {
      font-family: "MS Sans Serif", sans-serif;
      font-size: 11px;
      line-height: 1.4;
      margin-bottom: 20px;
    }
  }

  .contact-items {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .contact-item {
    align-items: center;
    background: rgb(0 0 0 / 5%);
    border: 1px inset #b0b0b0;
    display: flex;
    padding: 10px;

    .icon {
      font-size: 16px;
      margin-right: 10px;
    }

    strong {
      font-size: 11px;
      font-weight: bold;
    }
  }

  .contact-form {
    background: #ece9d8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
  }

  .success-message {
    background: #c3ffc3;
    border: 2px inset #ece9d8;
    color: #008000;
    font-size: 11px;
    margin-bottom: 15px;
    padding: 8px;
  }

  .form-group {
    margin-bottom: 15px;

    label {
      color: #000;
      display: block;
      font-size: 11px;
      font-weight: normal;
      margin-bottom: 4px;
    }

    select {
      background: #fff;
      border: 2px inset #ece9d8;
      box-sizing: border-box;
      font-family: "MS Sans Serif", sans-serif;
      font-size: 11px;
      padding: 2px 4px;
      width: 100%;

      &:focus {
        outline: 1px dotted #000;
        outline-offset: -1px;
      }
    }

    textarea {
      background: white;
      border: 2px inset #ece9d8;
      box-sizing: border-box;
      font-family: "MS Sans Serif", sans-serif;
      font-size: 11px;
      min-height: 80px;
      padding: 4px 6px;
      resize: none;
      width: 100%;

      &:focus {
        outline: 1px dotted #000;
        outline-offset: -1px;
      }
    }

    input {
      background: white;
      border: 2px inset #ece9d8;
      box-sizing: border-box;
      font-family: "MS Sans Serif", sans-serif;
      font-size: 11px;
      padding: 4px 6px;
      width: 100%;

      &:focus {
        outline: 1px dotted #000;
        outline-offset: -1px;
      }
    }
  }

  .submit-btn {
    align-self: flex-start;
    background: linear-gradient(180deg, #ece9d8 0%, #d4d0c8 50%, #bfb8a8 100%);
    border: 2px outset #ece9d8;
    color: #000;
    cursor: pointer;
    font-family: "MS Sans Serif", sans-serif;
    font-size: 11px;
    font-weight: normal;
    padding: 6px 16px;
    width: auto;

    &:hover {
      background: linear-gradient(
        180deg,
        #f0ede0 0%,
        #d8d4cc 50%,
        #c3bcac 100%
      );
    }

    &:active {
      border: 2px inset #ece9d8;
      padding: 7px 15px 5px 17px;
    }
  }

  @media (width <= 768px) {
    .contact-container {
      grid-template-columns: 1fr;
    }

    .contact-info,
    .contact-form {
      padding: 15px;
    }

    .contact-info h1 {
      font-size: 16px;
    }
  }
`;

export default StyledContact;
