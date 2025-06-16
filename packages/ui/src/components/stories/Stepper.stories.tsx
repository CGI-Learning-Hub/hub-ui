import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import StepLabel from "@mui/material/StepLabel";
import Stepper, { StepperProps } from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";

const steps = ["Paramètres", "Créer un groupe", "Validation"];

const LinearStepper = (props: StepperProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} {...props}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optionnel</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Toutes les étapes sont complétées - vous avez terminé
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Réinitialiser</Button>
          </Box>
        </Fragment>
      ) : (
        <Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Étape {activeStep + 1}</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Précédent
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Passer
              </Button>
            )}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Terminer" : "Suivant"}
            </Button>
          </Box>
        </Fragment>
      )}
    </Box>
  );
};

const NonLinearStepper = (props: StepperProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              Toutes les étapes sont complétées - vous avez terminé
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Réinitialiser</Button>
            </Box>
          </Fragment>
        ) : (
          <Fragment>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              Étape {activeStep + 1}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Précédent
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Suivant
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}
                  >
                    Étape {activeStep + 1} déjà complétée
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? "Terminer"
                      : "Compléter l'étape"}
                  </Button>
                ))}
            </Box>
          </Fragment>
        )}
      </div>
    </Box>
  );
};
const meta: Meta<typeof Stepper> = {
  title: "Components/Stepper",
  component: Stepper,
  parameters: {
    docs: {
      description: {
        component:
          "Les steppers transmettent les progrès par le biais d'étapes numérotées. Ils permettent d'obtenir un flux de travail semblable à celui d'un assistant.",
      },
    },
  },
  argTypes: {
    alternativeLabel: {
      control: "boolean",
      description: "Positionne le label de l'étape sous l'icône",
    },
    nonLinear: {
      control: "boolean",
      description:
        "Si cette option est activée, le stepper n'aidera pas à contrôler les étapes d'un flux linéaire",
    },
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "Orientation du composant",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Stepper>;

export const Linear: Story = {
  render: (args) => <LinearStepper {...args} />,
  args: {
    alternativeLabel: false,
    nonLinear: false,
    orientation: "horizontal",
  },
};

export const NonLinear: Story = {
  render: (args) => <NonLinearStepper {...args} />,
  args: {
    alternativeLabel: false,
    nonLinear: true,
    orientation: "horizontal",
  },
};
