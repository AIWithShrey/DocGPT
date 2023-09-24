import * as React from "react";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListDivider from "@mui/joy/ListDivider";
import Select, { SelectOption } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import ArticleIcon from "@mui/icons-material/Article";
import { useState } from "react";
import { usePromptGpt4 } from "../functions/lambda";

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

interface CustomDropdownProps {
  prompt: string;
}

export default function CustomDropdown(props: CustomDropdownProps) {
  const [selectedOption, setSelectedOption] = useState(""); // Default state is empty, indicating no initial selection
  const [shouldFetch, setShouldFetch] = useState(false);
  const { isLoading, data } = usePromptGpt4(selectedOption, props.prompt, {
    enabled: shouldFetch,
  });

  return (
    <Select
      value={selectedOption}
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
      {/* Add the prompt option */}
      <Option value="">{props.prompt}</Option>

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
