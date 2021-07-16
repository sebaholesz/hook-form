import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Input from "../Input/Input";
import Checkbox from "../Checkbox/Checkbox";
import RadioGroup from "../RadioGroup/RadioGroup";
import { NewsletterFormStyled, StyledButton } from "./NewsletterForm.style";

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .notRequired()
    .matches(
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
      {
        message: "jméno nemůže obsahovat speciální znaky nebo číslice",
        excludeEmptyString: true,
      }
    ),
  email: Yup.string()
    .email("nesprávný formát emailové adresy")
    .required("email je vyžadován"),
  gdprCompliance: Yup.bool().oneOf([true], "souhlas s GDPR je vyžadován"),
  newsletterFrequency: Yup.string().required(
    "je nutno vybrat frekvenci zasílání newsletteru"
  ),
});

const NewsletterForm = (props) => {
  const formProviderMethods = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      fullName: "",
      gdprCompliance: false,
      newsletterFrequency: "",
    },
    criteriaMode: "firstError",
    shouldFocusError: true,
    resolver: yupResolver(validationSchema),
  });

  const submitHandler = (data, e) => {
    console.log(data);
    console.log(e);
  };

  return (
    <NewsletterFormStyled>
      <FormProvider {...formProviderMethods}>
        <form onSubmit={formProviderMethods.handleSubmit(submitHandler)}>
          <Input type="email" label="Váš email" required={true} name="email" />
          <Input
            type="text"
            label="Vaše jméno"
            required={false}
            name="fullName"
          />
          <Checkbox
            label="Souhlasíte s podmínkami GDPR"
            required={true}
            name="gdprCompliance"
          />
          <RadioGroup
            label="Jak často chcete dostávat náš newsletter?"
            required={true}
            name="newsletterFrequency"
            options={[
              { value: "weekly", label: "jednou týdně" },
              { value: "monthly", label: "jednou měsíčně" },
            ]}
          />
          <StyledButton type="submit">Odeslat</StyledButton>
        </form>
      </FormProvider>
    </NewsletterFormStyled>
  );
};

export default NewsletterForm;
