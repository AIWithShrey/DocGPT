import * as React from "react";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListDivider from "@mui/joy/ListDivider";
import Select, { SelectOption } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import ArticleIcon from "@mui/icons-material/Article";
import { useState } from "react";
import { useLambdaCall } from "../functions/lambda";

const options = [
  { value: "mui", label: "MUI" },
  { value: "pinecone", label: "Pinecone" },
  { value: "docker", label: "Docker" },
];

function renderValue(option: SelectOption<string> | null) {
  if (!option) {
    return null;
  }

  return (
    <React.Fragment>
      <ListItemDecorator>
        <ArticleIcon />
      </ListItemDecorator>
      {option.label}
    </React.Fragment>
  );
}

export default function CustomDropdown() {
  const [selectedOption, setSelectedOption] = useState(options[0].value); // Introducing state for the current selection
  const [shouldFetch, setShouldFetch] = useState(false);
  const { isLoading, data } = useLambdaCall(selectedOption, {
    enabled: shouldFetch,
  });

  return (
    <Select
      value={selectedOption} // Use the state as the current value
      onChange={(_, value) => {
        if (value) {
          setSelectedOption(value);
        }
      }}
      slotProps={{
        listbox: {
          sx: {
            "--ListItemDecorator-size": "44px",
          },
        },
      }}
      sx={{
        "--ListItemDecorator-size": "44px",
        minWidth: 240,
      }}
      renderValue={renderValue}
    >
      {options.map((option, index) => (
        <React.Fragment key={option.value}>
          {index !== 0 ? <ListDivider role="none" /> : null}
          <Option value={option.value} label={option.label}>
            <ListItemDecorator></ListItemDecorator>
            {option.label}
          </Option>
        </React.Fragment>
      ))}
    </Select>
  );
}
