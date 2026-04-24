import React, { useState, useEffect } from "react";
import {
    SpaceBetween,
    Container,
    Header,
    Grid,
    Box,
    Input,
    Textarea,
} from "@cloudscape-design/components";

export interface RubricDescriptor {
    points: number | string;
    description: string;
}

export interface RubricRow {
    criterion: string;
    maxPoints: number;
    descriptors: RubricDescriptor[];
}

export interface WRRubricContainerProps {
    title: string;
    description: string;
    rubric: RubricRow[];
    namePrefix: string;
    applicantResponse: string;
    onScoreChange: (score: number) => void;
    onFilledChange?: (filled: boolean) => void;
}

export function RubricRow({
    row,
    namePrefix,
    onValueChange,
}: {
    row: RubricRow;
    namePrefix: string;
    onValueChange: (criterion: string, value: number, filled: boolean) => void;
}) {
    const inputName = `${namePrefix}_${row.criterion.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "")}`;
    const [value, setValue] = useState("");
    const [touched, setTouched] = useState(false);

    const handleChange = ({ detail }: { detail: { value: string } }) => {
        const num = Number(detail.value);
        if (detail.value === "" || (num >= 0 && num <= row.maxPoints)) {
            setValue(detail.value);
            onValueChange(row.criterion, detail.value === "" ? 0 : num, detail.value !== "");
        }
    };

    const isEmpty = value === "";

    return (
        <>
            <input type="hidden" name={inputName} value={value} />
            <Grid gridDefinition={[{ colspan: 3 }, { colspan: 7 }, { colspan: 2 }]}>
                <Box>
                    <Box fontWeight="bold">{row.criterion}</Box>
                    <Box color="text-body-secondary" fontSize="body-s">
                        {row.maxPoints} points
                    </Box>
                </Box>

                <SpaceBetween direction="vertical" size="xs">
                    {row.descriptors.map((d) => (
                        <Box key={d.points}>
                            <Box variant="span" fontWeight="bold">
                                {d.points} {d.points === "1" ? "point" : "points"}:{" "}
                            </Box>
                            {d.description}
                        </Box>
                    ))}
                </SpaceBetween>

                <SpaceBetween direction="vertical" size="xxs">
                    <Input
                        type="number"
                        inputMode="numeric"
                        value={value}
                        onChange={handleChange}
                        onBlur={() => setTouched(true)}
                        placeholder="0"
                        invalid={touched && isEmpty}
                    />
                    <Box color={touched && isEmpty ? "text-status-error" : "text-body-secondary"} fontSize="body-s">
                        {touched && isEmpty ? "Required" : `out of ${row.maxPoints}`}
                    </Box>
                </SpaceBetween>
            </Grid>
        </>
    );
}

export default function WRRubricContainer({
    title,
    description,
    rubric,
    namePrefix,
    applicantResponse,
    onScoreChange,
    onFilledChange,
}: WRRubricContainerProps) {
    const [criterionScores, setCriterionScores] = useState<Record<string, number>>(
        Object.fromEntries(rubric.map((r) => [r.criterion, 0]))
    );
    const [filledCriteria, setFilledCriteria] = useState<Record<string, boolean>>(
        Object.fromEntries(rubric.map((r) => [r.criterion, false]))
    );

    const handleValueChange = (criterion: string, value: number, filled: boolean) => {
        setCriterionScores((prev) => ({ ...prev, [criterion]: value }));
        setFilledCriteria((prev) => ({ ...prev, [criterion]: filled }));
    };

    useEffect(() => {
        onScoreChange(Object.values(criterionScores).reduce((sum, v) => sum + v, 0));
    }, [criterionScores]);

    useEffect(() => {
        onFilledChange?.(Object.values(filledCriteria).every(Boolean));
    }, [filledCriteria]);

    const wordCount = applicantResponse
        ? applicantResponse.trim().split(/\s+/).filter(Boolean).length
        : 0;

    return (
        <Container header={<Header variant="h2" description={description}>{title}</Header>}>
            <SpaceBetween direction="vertical" size="m">
                <Textarea
                    value={applicantResponse || "No response provided."}
                    readOnly
                    rows={5}
                />
                <Box color="text-body-secondary" fontSize="body-s">
                    {wordCount} {wordCount === 1 ? "word" : "words"}
                </Box>

                <SpaceBetween direction="vertical" size="s">
                    <Grid gridDefinition={[{ colspan: 3 }, { colspan: 7 }, { colspan: 2 }]}>
                        <Box fontWeight="bold" color="text-body-secondary">Criterion</Box>
                        <Box fontWeight="bold" color="text-body-secondary">Descriptors</Box>
                        <Box fontWeight="bold" color="text-body-secondary">Score</Box>
                    </Grid>

                    <hr style={{ border: "none", borderTop: "1px solid var(--color-border-divider-default)", margin: 0 }} />

                    {rubric.map((row, i) => (
                        <React.Fragment key={row.criterion}>
                            <RubricRow row={row} namePrefix={namePrefix} onValueChange={handleValueChange} />
                            {i < rubric.length - 1 && (
                                <hr style={{ border: "none", borderTop: "1px solid var(--color-border-divider-default)", margin: 0 }} />
                            )}
                        </React.Fragment>
                    ))}
                </SpaceBetween>
            </SpaceBetween>
        </Container>
    );
}