<?php

trait LastError
{
    protected $lastError = '';

    /**
     * Set last error
     *
     * @param string $message
     */
    protected function setLastError(string $message): void
    {
        $this->lastError = $message;
    }

    /**
     * Get last error
     *
     * @return string
     */
    public function getLastError(): string
    {
        return $this->lastError;
    }
}
