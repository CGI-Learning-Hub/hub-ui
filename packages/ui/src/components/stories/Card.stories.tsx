import MUICard, { CardProps } from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../Button";

const Card = (props: CardProps) => {
  return (
    <MUICard sx={{ minWidth: 275 }} {...props}>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          be-nev-o-lent
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="text" size="small">
          Learn More
        </Button>
      </CardActions>
    </MUICard>
  );
};

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  argTypes: {
    elevation: {
      control: "number",
    },
    square: {
      control: "boolean",
    },
    variant: {
      control: "select",
      options: ["elevation", "outlined"],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    elevation: 1,
    square: false,
    variant: "elevation",
  },
};
